import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

interface EditorBackButtonProps {
  unsavedProgress: boolean
}

const BackButton = styled.button`
  cursor: pointer;
  border: none;
  display: block;
  width: auto;
  height: auto;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1em;
  padding-right: 3em;
  svg { 
    height: 100%;
    margin-right: 1em;
  }
  span {
    color: #000;
    font-size: 1.3em;
    font-weight: 700;
  }
  border-right: solid 1px #ccc;
`

const EditorBackButton: React.FC<EditorBackButtonProps> = ({ unsavedProgress }) => {
  const navigate = useNavigate()

  return (
    <BackButton onClick={() => navigate('/')}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#000" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
      </svg>
      <span>Back</span>
    </BackButton>
  )
}

export default EditorBackButton
