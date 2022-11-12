import { z } from 'zod'

import { Quiz } from '$entities'

export const PostRequestSchema = z.object({
  title: z.string(),
  questions: z.object({
    text: z.string(),
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

export const onRequestPost: Handler = async ctx => {
  const body = await ctx.request.json()

  const validation = PostRequestSchema.safeParse(body)
  if (!validation.success) return new Response(validation.error.message, { status: 400 })

  const model = validation.data

  const quiz: Quiz = {
    id: crypto.randomUUID(),
    title: model.title,
    secret: crypto.randomUUID(),
    questions: model.questions.map(question => ({
      id: crypto.randomUUID(),
      text: question.text,
      choices: question.choices.map(choice => ({
        id: crypto.randomUUID(),
        text: choice.text,
        isCorrect: choice.isCorrect
      }))
    })),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  JSON.parse('')

  const key = `quiz#${quiz.id}`
  const value = JSON.stringify(quiz)
  await ctx.env.STORE.put(key, value)

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

  const json = JSON.stringify(response)

  return new Response(json, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
