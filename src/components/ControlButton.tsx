import React from 'react'
import styled from 'styled-components'

interface ControlButtonProps {
  onClick: () => void
  children: React.ReactNode
  height?: number
  width?: number
  fontSize?: number
  marginRight?: number
}

interface ButtonProps {
  height?: number
  width?: number
  fontSize?: number
  marginRight?: number
}

const Button = styled.button<ButtonProps>`
  background: #fff;
  border: none;
  padding: 0em 1em;
  margin: 0.4em;
  color: #000;
  font-weight: 700;
  cursor: pointer;
  border-radius: 8px;
  box-shadow: 0px 4px 6px -2px rgba(0, 0, 0, 0.25);
  height: ${({ height }) => height ? `${height}px` : 'auto'};
  width: ${({ width }) => width ? `${width}px` : 'auto'};
  font-size: ${({ fontSize }) => fontSize ? `${fontSize}em` : '0.9em'};
  margin-right: ${({ marginRight }) => marginRight ? `${marginRight}px` : '0px'};
  display: block;
`

const ControlButton: React.FC<ControlButtonProps> = ({ onClick, width, height, fontSize, marginRight, children }) => {
  return <Button onClick={onClick} width={width} height={height} fontSize={fontSize} marginRight={marginRight}>
    {children}
  </Button>
}

export default ControlButton