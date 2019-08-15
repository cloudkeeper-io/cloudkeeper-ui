import React, { memo } from 'react'
import styled from 'styled-components/macro'
import { Typography } from '@material-ui/core'

const Wrapper = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding-bottom: 20px;
`
const Title = styled(Typography)`
  margin: 10px 0 15px 20px;
`

interface TrendsCardProps {
  trends: any[],
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
export const TrendsCard = memo(({ trends }: TrendsCardProps) => (
  <Wrapper>
    <Title variant="h5">Trends</Title>
  </Wrapper>
))
