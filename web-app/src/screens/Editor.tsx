import React from 'react'
import styled from 'styled-components'

import EditorBackButton from '../components/Editor/EditorBackButton'
import ControlButton from '../components/ControlButton'
import EditorQuestions from '../components/Editor/EditorQuestions'

const Container = styled.div`
  position: relative;
  width: 100%;
  background: #EDA2A1;
  min-height: 100%;
  overflow-x: hidden;
  padding-top: 60px;
`

const TopBar = styled.div`
  height: 60px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  z-index: 99;
`

const TopBarTitleInput = styled.input`
  display: block;
  flex: 1;
  border: none;
  outline: none;
  padding-left: 1em;
  padding-right: 1em;
  font-size: 1.2em;
`

const Editor: React.FC = () => {
  return (
    <Container>
      <TopBar>
        <EditorBackButton unsavedProgress={false} />
        <TopBarTitleInput type='text' placeholder="Untitled" />
        <ControlButton onClick={() => {}}>New question</ControlButton>
        <ControlButton marginRight={2} onClick={() => {}}>Publish</ControlButton>
      </TopBar>
      <EditorQuestions />
    </Container>
  )
}

export default Editor
