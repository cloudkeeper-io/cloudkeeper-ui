import React from 'react'
import styled from 'styled-components/macro'

const Wrapper = styled.div<{ minHeight?: string }>`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: calc(100% - 40px);
  min-height: ${p => p.minHeight || 'calc(100vh - 100px)'};
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

interface SettingsContainerProps {
  minHeight?: string
  className?: string
}

export default ({ minHeight, className }: SettingsContainerProps) => (
  <Wrapper minHeight={minHeight} className={className}>
    <Title>Settings ⚙</Title>
    <Text>Settings will be there</Text>
  </Wrapper>
)
