import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  width: 100%;
  background: #EDA2A1;
  min-height: 100%;
`

const TopBar = styled.div`
  height: 60px;
  width: 100%;
  position: relative;
  background: #fff;
`



const Editor: React.FC = () => {
  return (
    <Container>
      <TopBar />
    </Container>
  )
}

export default Editor
