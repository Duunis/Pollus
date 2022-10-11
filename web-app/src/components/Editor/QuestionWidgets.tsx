import React from 'react'
import styled from 'styled-components'
import ControlButton from '../ControlButton'
import { SubTitle } from './common'
import { WidgetType } from './WidgetEditor'

interface WidgetButtonProps {
  text: string
  onClick: () => void
}

const QuestionWidgetsContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  margin-left: 1em;
`

const WidgetButton: React.FC<WidgetButtonProps> = ({ text, onClick }) => {
  return (
    <ControlButton onClick={onClick}>
      {text}
    </ControlButton>
  )
}

const QuestionWidgets: React.FC = () => {

  const openWidgetEditor = (widgetType: WidgetType) => {

  }

  return (
    <>
      <SubTitle>
        Add up to 3 widgets
      </SubTitle>
      <QuestionWidgetsContainer>
        <WidgetButton text={'💻 Code'} onClick={() => openWidgetEditor('code')} />
        <WidgetButton text={'📷 Image'} onClick={() => openWidgetEditor('image')}/>
        <WidgetButton text={'🎥 Video'} onClick={() => openWidgetEditor('video')}/>
      </QuestionWidgetsContainer>
    </>
  )
}

export default QuestionWidgets
