import * as React from 'react'
import styled from 'styled-components/macro'

const DEFAULT_BG = 'linear-gradient(180deg, rgba(0, 255, 176, 0.375) 0%, rgba(197, 0, 255, 0.375) 75.68%)'

const Border = styled.div<{ showBorder: boolean }>`
  width: 400px;
  height: 300px;
  max-width: calc(100vw - 20px);
  padding: 2px;
  background: ${p => p.showBorder ? p.theme.card.borderColor : 'transparent'};
  clip-path: ${p => p.theme.card.clipPath};
  transition: all 0.5s;
`
const Shadow = styled.div`
  filter: drop-shadow(0 0 8px ${p => p.theme.card.shadow});
  transition: all 0.5s;
`
const Wrapper = styled.div<{ background: string, showBorder: boolean }>`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: ${p => p.theme.card.background};
  border-radius: ${p => p.theme.card.borderRadius};
  clip-path: ${p => p.theme.card.clipPath};
  transition: all 0.5s;
`

interface CardProps {
  children?: JSX.Element | JSX.Element[] | string
  background?: string
  showBorder?: boolean
  className?: string
}

export default ({ children, background = DEFAULT_BG, showBorder = true, className }: CardProps) => (
  <Shadow>
    <Border showBorder={showBorder}>
      <Wrapper className={className} background={background} showBorder={showBorder}>
        {children}
      </Wrapper>
    </Border>
  </Shadow>
)
