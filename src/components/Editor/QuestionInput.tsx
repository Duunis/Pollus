import React from 'react'
import styled from 'styled-components'

const Input = styled.textarea`
  position: relative;
  display: block;
  max-width: 1000px;
  width: 70%;
  height: 200px;
  margin: 1em;
  resize: none;
  outline: none;
  border: none;
  border-radius: 8px;
  box-shadow: 0px 4px 6px -2px rgba(0, 0, 0, 0.25);
  padding: 1.2em;
  font-size: 1.4em;
`

const QuestionInput: React.FC = () => {
  return (
    <Input placeholder="Insert question" />
  )
}

export default QuestionInput
