/**
 *  Database entity schemas
 */

import { z } from 'zod'

export const VideoWidgetSchema = z.object({
  id: z.string(),
  type: z.literal('video')
})

export const ImageWidgetSchema = z.object({
  id: z.string(),
  type: z.literal('image')
})

export const CodeWidgetSchema = z.object({
  id: z.string(),
  type: z.literal('code'),
  language: z.string(),
  source: z.string()
})

export const WidgetSchema = z.discriminatedUnion('type', [
  VideoWidgetSchema,
  ImageWidgetSchema,
  CodeWidgetSchema
])

export const ChoiceSchema = z.object({
  id: z.string(),
  text: z.string(),
  isCorrect: z.boolean()
})

export const QuestionSchema = z.object({
  id: z.string(),
  text: z.string(),
  widgets: WidgetSchema.array(),
  choices: ChoiceSchema.array()
})

export const QuizSchema = z.object({
  id: z.string(),
  title: z.string(),
  secret: z.string(),
  questions: QuestionSchema.array(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type VideoWidget = z.infer<typeof VideoWidgetSchema>
export type ImageWidget = z.infer<typeof ImageWidgetSchema>
export type CodeWidget = z.infer<typeof CodeWidgetSchema>
export type Widget = z.infer<typeof WidgetSchema>
export type Choice = z.infer<typeof ChoiceSchema>
export type Question = z.infer<typeof QuestionSchema>
export type Quiz = z.infer<typeof QuizSchema>

export const AnswerSchema = z.object({
  id: z.string(),
  questionId: z.string(),
  choiceId: z.string(),
  isCorrect: z.boolean(),
})

export const SubmissionSchema = z.object({
  id: z.string(),
  answers: AnswerSchema.array(),
})

export type Answer = z.infer<typeof AnswerSchema>
export type Submission = z.infer<typeof SubmissionSchema>
