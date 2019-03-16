import * as React from 'react'
import styled from 'styled-components/macro'

const DEFAULT_BG = 'linear-gradient(180deg, rgba(0, 255, 176, 0.375) 0%, rgba(197, 0, 255, 0.375) 75.68%)'

const Wrapper = styled.div<{ width?: string, height?: string }>`
  position: relative;
  transition: all 0.5s;
  max-width: 100%;
  z-index: 0;
`
const BorderShadow = styled.div<{ showBorder?: boolean }>`
  position: absolute;
  top: ${p => (p.showBorder ? 0 : '2px')};
  left: ${p => (p.showBorder ? 0 : '2px')};
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 8px ${p => p.theme.card.shadow});
  transition: all 0.5s;
  max-width: 100%;
  z-index: 0;
`
const Border = styled.div<{ showBorder: boolean }>`
  width:  ${p => (p.showBorder ? '100%' : 'calc(100% - 1px)')};
  height:  ${p => (p.showBorder ? '100%' : 'calc(100% - 1px)')};
  padding: ${p => (p.showBorder ? '2px' : 0)};
  background: ${p => p.color || p.theme.card.borderColor};
  clip-path: ${p => p.theme.card.borderClipPath};
  transition: all 0.5s;
`
const Content = styled.div<{ background: string }>`
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
    <BorderShadow showBorder={showBorder}>
      <Border showBorder={showBorder} />
    </BorderShadow>
    <Content background={background}>
      {children}
    </Content>
  </Wrapper>
)

Card.Content = Content
Card.Border = Border
Card.BorderShadow = BorderShadow

export default Card
