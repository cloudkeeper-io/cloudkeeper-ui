import React from 'react'
import styled from 'styled-components/macro'
import { CircularProgress } from '@material-ui/core'

const SpinnerWrapper = styled.div<{ height?: string }>`
  width: 100%;
  height: ${p => p.height || '100vh'};
  display: flex;
  justify-content: center;
  align-items: center;
`

interface LoadingProps {
  height?: any
  error?: any
  className?: any
}

export default ({ error, height, className }: LoadingProps) => {
  if (error) {
    // eslint-disable-next-line no-console
    console.log(error)
    return error.toString()
  }

  return (
    <SpinnerWrapper height={height} className={className}>
      <CircularProgress />
    </SpinnerWrapper>
  )
}
