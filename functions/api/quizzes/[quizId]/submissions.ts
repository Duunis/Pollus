import { z } from 'zod'

import { Answer, Quiz, QuizSchema, Submission, SubmissionSchema } from '$entities'

export const PostRequestSchema = z.object({
  questionId: z.string(),
  choiceId: z.string(),
}).array()

export type PostRequest = z.infer<typeof PostRequestSchema>

type StuffError =
  | { message: string; quizId: string; questionId: string }
  | { message: string; quizId: string; questionId: string; choiceId: string }

type StuffAccumulator =
  | { tag: 'error', errors: StuffError[] }
  | { tag: 'ok', answers: Answer[] }

const stuff = (quiz: Quiz) => (acc: StuffAccumulator, answer: PostRequest[0]): StuffAccumulator => {
  const errors = acc.tag === 'error' ? acc.errors : []

  const question = quiz.questions.find(question => question.id === answer.questionId)
  if (question === undefined) return {
    tag: 'error',
    errors: [...errors, { 
      message: 'Question does not exist', 
      quizId: quiz.id, 
      questionId: answer.questionId 
    }],
  }
  
  const choice = question.choices.find(choice => choice.id === answer.choiceId)
  if (choice === undefined) return {
    tag: 'error',
    errors: [{
      message: `Choice does not exist`,
      choiceId: answer.choiceId,
      questionId: question.id,
      quizId: quiz.id,
    }, ...errors]
  }
  
  if (acc.tag === 'error') return acc

  return {
    tag: 'ok',
    answers: [
      ...acc.answers,
      {
        id: crypto.randomUUID(),
        choiceId: answer.choiceId,
        questionId: answer.questionId,
        isCorrect: choice.isCorrect
      }
    ]
  }
}

export const onRequestPost: Handler = async ctx =>  {
  const quizId = ctx.params.quizId
  if (Array.isArray(quizId)) return new Response('Internal Server Error', { status: 500 })

  const bodyJson = await ctx.request.json()

  const bodyValidation = PostRequestSchema.safeParse(bodyJson)
  if (!bodyValidation.success) return new Response(bodyValidation.error.message, { status: 400 })

  const body = bodyValidation.data

  const quizItem = await ctx.env.STORE.get(`quiz#${quizId}`, { type: 'json' })
  if (quizItem === null) return new Response('Quiz not found', { status: 404 })

  const quizValidation = QuizSchema.safeParse(quizItem)
  if (!quizValidation.success) {
    ctx.data.sentry.setTag('quiz_id', quizId)
    ctx.data.sentry.captureMessage('Quiz is not valid')
    return new Response('Internal Server Error', { status: 500 })
  }

  const quiz = quizValidation.data

  const answersResult = body.reduce(stuff(quiz), { tag: 'ok', answers: [] })
  if (answersResult.tag === 'error') return new Response(JSON.stringify(answersResult.errors), { status: 400 })
  const answers = answersResult.answers

  const submission: Submission = {
    id: crypto.randomUUID(),
    answers: answers
  }

  const submissionKey = `quiz#${quizId}#submission#${submission.id}`
  const submissionJson = JSON.stringify(submission)
  await ctx.env.STORE.put(submissionKey, submissionJson)

  return new Response('OK')
}

export const GetResponseSchema = z.object({
  cursor: z.string().optional(),
  submissions: z.object({
    id: z.string(),
    answers: z.object({
      id: z.string(),
      questionId: z.string(),
      choiceId: z.string(),
      isCorrect: z.boolean(),
    }).array(),
  }).array(),
})

export interface GetResponse {
  cursor?: string
  submissions: Array<{
    id: string
    answers: Array<{
      id: string
      questionId: string
      choiceId: string
      isCorrect: boolean
    }>
  }>
}

export const onRequestGet: Handler = async ctx => {
  const quizId = ctx.params.quizId
  if (Array.isArray(quizId)) return new Response('Internal Server Error', { status: 500 })

  const secret = ctx.request.headers.get('Authorization')
  if (secret === null) return new Response('Unauthorized', { status: 401 })

  const url = new URL(ctx.request.url)
  const cursor = url.searchParams.get('cursor')

  const quizItem = await ctx.env.STORE.get(`quiz#${quizId}`, { type: 'json' })
  if (quizItem === null) return new Response('Quiz not found', { status: 404 })

  const quizValidation = QuizSchema.safeParse(quizItem)
  if (!quizValidation.success) {
    ctx.data.sentry.setTag('quiz_id', quizId)
    ctx.data.sentry.captureMessage('Quiz is not valid')
    return new Response('Internal Server Error', { status: 500 })
  }
  
  const quiz = quizValidation.data
  
  if (quiz.secret !== secret) return new Response('Unauthorized', { status: 401 })

  const submissionsListResult = await ctx.env.STORE.list({ prefix: `quiz#${quizId}#submission#`, cursor: cursor })
  const submissionItems = await Promise.all(submissionsListResult.keys.map(key => ctx.env.STORE.get(key.name, { type: 'json' })))
  const submissionsValidation = z.array(SubmissionSchema).safeParse(submissionItems)
  if (!submissionsValidation.success) return new Response('Internal Server Error', { status: 500 })
  const submissions = submissionsValidation.data

  const response: GetResponse = {
    cursor: submissionsListResult.cursor,
    submissions: submissions.map(submission => ({
      id: submission.id,
      answers: submission.answers.map(answer => ({
        id: answer.id,
        questionId: answer.questionId,
        choiceId: answer.choiceId,
        isCorrect: answer.isCorrect,
      }))
    }))
  }

  const responseBody = JSON.stringify(response)

  return new Response(responseBody, {
    headers: {
      'Content-Type': 'application/json', 
    }
  })
}
