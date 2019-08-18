import React from 'react'
import styled from 'styled-components/macro'

const Wrapper = styled.div<{ minHeight?: string }>`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: calc(100% - 40px);
  min-height: ${(p) => p.minHeight || 'calc(100vh - 100px)'};
  padding: 0 20px;
  align-items: center;
  justify-content: center;
`
const Title = styled.div`
  font-size: 44px;
  font-weight: 300;
  text-align: center;
`
const Text = styled.p`
  text-align: center;
`

interface ErrorContainerProps {
  minHeight?: string
  className?: string
  title?: string
  text?: string
}

export default ({ minHeight, title = 'Error', text, className }: ErrorContainerProps) => (
  <Wrapper minHeight={minHeight} className={className}>
    <Title>{title}</Title>
    <Text>{text || 'Something went wrong. Please refresh the page and try again'}</Text>
  </Wrapper>
)
