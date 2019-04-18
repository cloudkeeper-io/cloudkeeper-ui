import React from 'react'
import styled from 'styled-components/macro'
import isBoolean from 'lodash/isBoolean'

const isBorderVisible = ((p: any) => {
  if (isBoolean(p.showBorder)) {
    return p.showBorder
  }
  return p.theme.card.showBorder
})

const Wrapper = styled.div<{ width?: string, height?: string, showBorder?: boolean, background?: string }>`
  position: relative;
  max-width: 100%;
  border-radius: ${p => p.theme.card.borderRadius};
  border: ${p => (isBorderVisible(p) ? '2px' : 0)} solid ${p => p.theme.card.borderColor};
  box-shadow: 0 0 8px ${p => p.theme.card.shadow};
  background: ${p => p.background || p.theme.card.background};
  backdrop-filter: blur(15px);
  z-index: 0;
`
const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
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

const Card = ({ children, background, showBorder, className }: CardProps) => (
  <Wrapper className={className} showBorder={showBorder} background={background}>
    <Content>
      {children}
    </Content>
  </Wrapper>
)

Card.Content = Content

export default Card
