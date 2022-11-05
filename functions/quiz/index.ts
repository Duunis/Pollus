import { z } from 'zod'

const PostQuizRequestModelSchema = z.object({
  title: z.string(),
  questions: z.object({
    text: z.string()
  }).array()
})

const PostQuizResponseModelSchema = z.object({
  id: z.string(),
  title: z.string(),
  secret: z.string(),
  questions: z.object({
    id: z.string(),
    text: z.string()
  }).array()
})

type PostQuizResponseModel = z.infer<typeof PostQuizResponseModelSchema>

const QuizSchema = z.object({
  id: z.string(),
  title: z.string(),
  secret: z.string(),
  questions: z.object({
    id: z.string(),
    text: z.string()
  }).array(),
  createdAt: z.string(),
  updatedAt: z.string()
})

type Quiz = z.infer<typeof QuizSchema>

export const onRequestPost: Handler = async (ctx) => {
  const body = await ctx.request.json()
  const validation = PostQuizRequestModelSchema.safeParse(body)
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

  const response: PostQuizResponseModel = {
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
