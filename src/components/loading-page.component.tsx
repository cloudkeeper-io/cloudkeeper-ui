import * as React from 'react'
import styled from 'styled-components'
import Spinner from './spinner.component'

const SpinnerWrapper = styled.div<{ height?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${p => p.height || '100vh'};
  background: ${props => props.theme.colors.background};
`

interface LoadingProps {
  height?: any
  error?: any
  className?: any
}

export default (props: LoadingProps) => {
  const { error, height, className } = props

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
