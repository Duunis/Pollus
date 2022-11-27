import React from 'react'
import styled from 'styled-components'
import { SubTitle } from './common'

const QuestionAnswersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`

const QuestionAnswers: React.FC = () => {
  return (
    <>
      <SubTitle>
        Answers
      </SubTitle>
      <QuestionAnswersContainer>
        
      </QuestionAnswersContainer>
    </>
  )
}

export default QuestionAnswers
