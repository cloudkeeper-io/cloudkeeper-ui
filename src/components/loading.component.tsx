import React from 'react'
import styled from 'styled-components/macro'
import Spinner from './spinner.component'

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
    console.log(error)
    return error.toString()
  }

  return (
    <SpinnerWrapper height={height} className={className}>
      <Spinner />
    </SpinnerWrapper>
  )
}
