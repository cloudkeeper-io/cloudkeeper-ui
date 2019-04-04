import React from 'react'
import styled from 'styled-components/macro'

import Icon from './icon.component'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% - 40px);
  height: calc(100vh - 120px);
  padding: 20px;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`
const Text = styled.div`
  max-width: 250px;
  text-align: center;
  padding: 20px 0;
`
const Cogs = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 0 20px 20px 0;
  min-width: 132px;
`
const Cog = styled(Icon)`
  text-shadow: none;
  animation-duration: 10s;
  filter: none;
`
const BottomIcon = styled(Cog)`
  position: absolute;
  bottom: 0;
  left: 40%;
`

interface ProcessingProps {
  className?: string
}

export default ({ className }: ProcessingProps) => (
  <Wrapper className={className}>
    <Cogs>
      <Cog icon="cog" spin size="4x" />
      <Cog icon="cog" spin size="3x" />
      <BottomIcon icon="cog" spin size="lg" />
    </Cogs>
    <Text>
      We&apos;re processing your data. It will take several minutes to do so.
      We will automatically show the data when we have it.
    </Text>
  </Wrapper>
)
