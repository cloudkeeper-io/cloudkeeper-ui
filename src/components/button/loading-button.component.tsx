import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button, { ButtonProps } from '@material-ui/core/Button'
import styled from 'styled-components'

const StyledButton = styled(Button)`
  min-width: 90px;
  svg {
    color: ${(p) => p.theme.palette.common.white};
  }
`

interface LoadingButtonProps extends ButtonProps {
  loading: boolean
  children?: JSX.Element | string | JSX.Element[]
}

export const LoadingButton = ({ loading, children, ...props }: LoadingButtonProps) => (
  <StyledButton {...props}>
    {loading ? <CircularProgress size={20} /> : children}
  </StyledButton>
)
