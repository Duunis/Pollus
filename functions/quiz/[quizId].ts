import { z } from 'zod'

const GetResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  questions: z.object({
    id: z.string(),
    text: z.string()
  }).array()
})

export const onRequestGet: Handler = async ctx => {
  const quizId = ctx.params.quizId

  const key = `quiz#${quizId}`
  const value = await ctx.env.POLLUS.get(key, { type: 'json' })

  if (value === null) return new Response('Not found', { status: 404 })

  const validation = GetResponseSchema.safeParse(value)
  
  if (!validation.success) return new Response('Internal Server Error', { status: 500 })

  const json = JSON.stringify(validation.data)
  return new Response(json, {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
