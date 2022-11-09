/**
 *  Database entity schemas
 */

import { z } from 'zod'

export const ChoiceSchema = z.object({
  id: z.string(),
  text: z.string(),
  isCorrect: z.boolean(),
})

export const QuestionSchema = z.object({
  id: z.string(),
  text: z.string(),
  choices: ChoiceSchema.array(),
})

export const QuizSchema = z.object({
  id: z.string(),
  title: z.string(),
  secret: z.string(),
  questions: QuestionSchema.array(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

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

export type Choice = z.infer<typeof ChoiceSchema>
export type Question = z.infer<typeof QuestionSchema>
export type Quiz = z.infer<typeof QuizSchema>
export type Answer = z.infer<typeof AnswerSchema>
export type Submission = z.infer<typeof SubmissionSchema>
