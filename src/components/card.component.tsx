import * as React from 'react'
import styled from 'styled-components/macro'

const DEFAULT_BG = 'linear-gradient(180deg, rgba(0, 255, 176, 0.375) 0%, rgba(197, 0, 255, 0.375) 75.68%)'

const Shadow = styled.div`
  filter: drop-shadow(0 0 8px ${p => p.theme.card.shadow});
`
const Wrapper = styled.div<{ background: string }>`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 300px;
  padding: 2px;
  background: ${p => p.theme.card.background};
  border: ${p => p.theme.card.border};
  border-radius: ${p => p.theme.card.borderRadius};
  clip-path: ${p => p.theme.card.clipPath};
`

interface CardProps {
  children?: JSX.Element | JSX.Element[] | string
  background?: string
}

export default ({ children, background = DEFAULT_BG }: CardProps) => (
  <Shadow>
    <Wrapper background={background}>
      {children}
    </Wrapper>
  </Shadow>
)
