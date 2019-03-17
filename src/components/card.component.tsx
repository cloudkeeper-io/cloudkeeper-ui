import React from 'react'
import styled from 'styled-components/macro'
import isBoolean from 'lodash/isBoolean'

const Wrapper = styled.div<{ width?: string, height?: string }>`
  position: relative;
  max-width: 100%;
  z-index: 0;
`

const isBorderVisible = ((p: any) => {
  if (isBoolean(p.showBorder)) {
    return p.showBorder
  }
  return p.theme.card.showBorder
})

const BorderShadow = styled.div<{ showBorder?: boolean }>`
  position: absolute;
  top: ${p => (isBorderVisible(p) ? 0 : '2px')};
  left: ${p => (isBorderVisible(p) ? 0 : '2px')};
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 8px ${p => p.theme.card.shadow});
  max-width: 100%;
  z-index: 0;
`
const Border = styled.div<{ showBorder: boolean }>`
  width:  ${p => (isBorderVisible(p) ? '100%' : 'calc(100% - 1px)')};
  height:  ${p => (isBorderVisible(p) ? '100%' : 'calc(100% - 1px)')};
  padding: ${p => (isBorderVisible(p) ? '2px' : 0)};
  background: ${p => p.theme.card.borderColor};
  border-radius: ${p => p.theme.card.borderRadius};
  clip-path: ${p => p.theme.card.borderClipPath};
`
const Content = styled.div<{ background?: string }>`
  display: flex;
  position: relative;
  top: 2px;
  left: 2px;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: ${p => p.background || p.theme.card.background};
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
  <Wrapper className={className}>
    <BorderShadow showBorder={showBorder}>
      <Border showBorder={showBorder!} />
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
