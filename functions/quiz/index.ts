import { z } from 'zod'
import { Quiz } from '../../interfaces/quiz'

const PostRequestSchema = z.object({
  title: z.string(),
  questions: z.object({
    text: z.string()
  }).array()
})

interface PostResponse {
  id: string
  title: string
  secret: string
  questions: Array<{
    id: string
    text: string
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
      text: question.text
    })),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  const key = `quiz#${quiz.id}`
  const value = JSON.stringify(quiz)
  await ctx.env.POLLUS.put(key, value)

  const response: PostResponse = {
    id: quiz.id,
    title: quiz.title,
    secret: quiz.secret,
    questions: quiz.questions.map(question => ({
      id: question.id,
      text: question.text
    }))
  }

  const json = JSON.stringify(response)

  return new Response(json, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
