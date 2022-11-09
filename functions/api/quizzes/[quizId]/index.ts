import { z } from 'zod'

export const GetResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  questions: z.object({
    id: z.string(),
    text: z.string(),
    choices: z.object({
      id: z.string(),
      text: z.string()
    }).array()
  }).array()
})

export type GetResponse = z.infer<typeof GetResponseSchema>

export const onRequestGet: Handler = async ctx => {
  const quizId = ctx.params.quizId
  if (Array.isArray(quizId)) return new Response('Internal Server Error', { status: 500 })
  const quizKey = `quiz#${quizId}`
  const quizItem = await ctx.env.STORE.get(quizKey, { type: 'json' })
  if (quizItem === null) return new Response('Quiz not found', { status: 404 })
  const quizValidation = GetResponseSchema.safeParse(quizItem)
  if (!quizValidation.success) return new Response('Internal Server Error', { status: 500 })
  const quiz = quizValidation.data

  const response: GetResponse = {
    id: quiz.id,
    title: quiz.title,
    questions: quiz.questions.map(question => ({
      id: question.id,
      text: question.text,
      choices: question.choices.map(choice => ({
        id: choice.id,
        text: choice.text
      }))
    }))
  }
  const responseJson = JSON.stringify(response)
  
  return new Response(responseJson, {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
