import React from 'react'
import styled from 'styled-components'
import Code from './CodeEditor'

export type WidgetType = 'code' | 'image' | 'video'

interface WidgetEditorProps {
  type: WidgetType
}

const WidgetEditorOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
  align-items: center;
  justify-content: center;
`

const WidgetEditorContainer = styled.div`
  position: relative;
  width: 50%;
  height: 50%;
  max-width: 1024px;
  background: #fff;
  border-radius: 1em;
  padding: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
`

const WidgetEditor: React.FC<WidgetEditorProps> = ({ type }) => {
  return (
    <WidgetEditorOverlay>
      <WidgetEditorContainer>
        <Code />
      </WidgetEditorContainer>
    </WidgetEditorOverlay>
  )
}

export default WidgetEditor
