import * as React from 'react'
import styled from 'styled-components/macro'

const DEFAULT_BG = 'linear-gradient(180deg, rgba(0, 255, 176, 0.375) 0%, rgba(197, 0, 255, 0.375) 75.68%)'

const Wrapper = styled.div<{ width?: string, height?: string }>`
  position: relative;
  transition: all 0.5s;
  max-width: 100%;
  z-index: 0;
`
const BorderShadow = styled.div<{ width?: string, height?: string }>`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 8px ${p => p.theme.card.shadow});
  transition: all 0.5s;
  max-width: 100%;
  z-index: 0;
`
const Border = styled.div<{ showBorder: boolean }>`
  width: 100%;
  height: 100%;
  padding: 2px;
  background: ${p => p.showBorder ? p.theme.card.borderColor : 'transparent'};
  clip-path: ${p => p.theme.card.borderClipPath};
  transition: all 0.5s;
`
const Content = styled.div<{ background: string, showBorder: boolean }>`
  display: flex;
  position: relative;
  top: 2px;
  left: 2px;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: ${p => p.theme.card.background};
  border-radius: ${p => p.theme.card.borderRadius};
  clip-path: ${p => p.theme.card.clipPath};
  transition: all 0.5s;
  z-index: 2;
`

interface CardProps {
  children?: JSX.Element | JSX.Element[] | string
  background?: string
  showBorder?: boolean
  className?: string
  cardClassName?: string
}

const Card = ({ children, background = DEFAULT_BG, showBorder = true, className }: CardProps) => (
  <Wrapper className={className}>
    <BorderShadow>
      <Border showBorder={showBorder} />
    </BorderShadow>
    <Content background={background} showBorder={showBorder}>
      {children}
    </Content>
  </Wrapper>
)

Card.Content = Content
Card.Border = Border
Card.BorderShadow = BorderShadow

export default Card
