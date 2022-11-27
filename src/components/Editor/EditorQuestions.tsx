import React from 'react'
import styled from 'styled-components'
import { Title } from './common'
import QuestionAnswers from './QuestionAnswers'

import QuestionInput from './QuestionInput'
import QuestionWidgets from './QuestionWidgets'

interface EditorQuestionProps {
  index: number
}

const QuestionContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
`

const Question: React.FC<EditorQuestionProps> = ({ index }) => {
  return (
    <QuestionContainer>
      <Title>Question {index}</Title>
      <QuestionInput />
      <QuestionWidgets />
      <QuestionAnswers />
    </QuestionContainer>
  )
}

const EditorQuestions: React.FC = () => {
  return (
    <>
      <Question index={1}/>
    </>
  )
}

export default EditorQuestions;
