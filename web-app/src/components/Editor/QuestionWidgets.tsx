import React from 'react'
import styled from 'styled-components'
import ControlButton from '../ControlButton'
import { SubTitle } from './common'
import WidgetEditor, { WidgetType } from './WidgetEditor'

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
  const [widgetEditorOpen, setWidgetEditorOpen] = React.useState<WidgetType | null>(null)

  const openWidgetEditor = (widgetType: WidgetType) => {
    setWidgetEditorOpen(widgetType)
  }

  return (
    <>
      {widgetEditorOpen !== null ? <WidgetEditor type={widgetEditorOpen} /> : null}
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
