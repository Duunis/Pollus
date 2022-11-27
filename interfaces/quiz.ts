export interface Question {
  id: string
  text: string
}

export interface Quiz {
  id: string
  title: string
  secret: string
  questions: Question[]
  createdAt: string
  updatedAt: string
}
