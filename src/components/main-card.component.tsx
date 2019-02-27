import * as React from 'react'
import styled from 'styled-components/macro'

const Shadow = styled.div`
  filter: drop-shadow(0 0 8px rgba(79, 250, 197, 0.3));
`
const Wrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 300px;
  background: linear-gradient(180deg, rgba(0, 255, 176, 0.375) 0%, rgba(197, 0, 255, 0.375) 75.68%);
  clip-path: polygon(13% 0, 100% 0, 100% 87%, 87% 100%, 0 100%, 0 13%);
`

interface CardProps {
  children?: JSX.Element | JSX.Element[] | string
}

export default ({ children }: CardProps) => (
  <Shadow>
    <Wrapper>
      {children}
    </Wrapper>
  </Shadow>
)
