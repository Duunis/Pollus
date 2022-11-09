import { z } from 'zod'

import { Answer, Quiz, QuizSchema, Submission } from '$entities'

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
  const inputJson = await ctx.request.json()
  const inputValidation = PostRequestSchema.safeParse(inputJson)
  if (!inputValidation.success) return new Response(inputValidation.error.message, { status: 400 })
  const input = inputValidation.data

  const quizId = ctx.params.quizId
  if (Array.isArray(quizId)) return new Response('Internal Server Error', { status: 500 })

  const quizItem = await ctx.env.STORE.get(`quiz#${quizId}`, { type: 'json' })
  if (quizItem === null) return new Response('Quiz not found', { status: 404 })
  const quizValidation = QuizSchema.safeParse(quizItem)
  if (!quizValidation.success) return new Response('Internal Server Error', { status: 500 })
  const quiz = quizValidation.data

  const answersResult = input.reduce(stuff(quiz), { tag: 'ok', answers: [] })
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
