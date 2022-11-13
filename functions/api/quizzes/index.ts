import { z } from 'zod'

import { Quiz, Widget } from '$entities'

export const PostRequestSchema = z.object({
  title: z.string(),
  questions: z.object({
    text: z.string(),
    widgets: z.discriminatedUnion('type', [
      z.object({
        type: z.literal('video'),
        id: z.string()
      }),
      z.object({
        type: z.literal('image'),
        id: z.string()
      }),
      z.object({
        type: z.literal('code'),
        id: z.string(),
        language: z.string(),
        source: z.string()
      })
    ]).array(),
    choices: z.object({
      text: z.string(),
      isCorrect: z.boolean(),
    }).array()
  }).array()
})

export type PostRequest = z.infer<typeof PostRequestSchema>

export interface PostResponse {
  id: string
  title: string
  secret: string
  questions: Array<{
    id: string
    text: string
    choices: Array<{
      id: string
      text: string
      isCorrect: boolean
    }>
  }>
}

function widget(data: PostRequest['questions'][0]['widgets'][0]): Widget {
  switch (data.type) {
    case 'video':
      return {
        id: data.id,
        type: 'video'
      }
    case 'image':
      return {
        id: data.id,
        type: 'image'
      }
    case 'code':
      return {
        id: data.id,
        type: 'code',
        language: data.language,
        source: data.source
      }
  }
}

export const onRequestPost: Handler = async ctx => {
  const bodyJson = await ctx.request.json()
  const bodyValidation = PostRequestSchema.safeParse(bodyJson)
  if (!bodyValidation.success) return new Response(bodyValidation.error.message, { status: 400 })
  const body = bodyValidation.data

  const quiz: Quiz = {
    id: crypto.randomUUID(),
    title: body.title,
    secret: crypto.randomUUID(),
    questions: body.questions.map(question => ({
      id: crypto.randomUUID(),
      text: question.text,
      widgets: question.widgets.map(widget),
      choices: question.choices.map(choice => ({
        id: crypto.randomUUID(),
        text: choice.text,
        isCorrect: choice.isCorrect
      }))
    })),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  const quizKey = `quiz#${quiz.id}`
  const quizValue = JSON.stringify(quiz)
  await ctx.env.STORE.put(quizKey, quizValue)

  const response: PostResponse = {
    id: quiz.id,
    title: quiz.title,
    secret: quiz.secret,
    questions: quiz.questions.map(question => ({
      id: question.id,
      text: question.text,
      choices: question.choices.map(choice => ({
        id: choice.id,
        text: choice.text,
        isCorrect: choice.isCorrect
      }))
    }))
  }

  const responseBody = JSON.stringify(response)

  return new Response(responseBody, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
