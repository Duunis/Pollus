import styled from 'styled-components/macro'

const FancyButton = styled.button`
  background: pink;
  
  :hover {
    width: 10rem;
    height: 10rem;
  }
`

export default function App() {
  return (
    <div>
      Hello, world!
      <FancyButton>Button</FancyButton>
    </div>
  );
}
