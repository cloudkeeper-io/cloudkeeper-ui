import React from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 30px 0;
`

export const DatepickerWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

interface PredefinedDateProps {
  active: boolean
}

export const PredefinedDate = styled(({ active, ...props }) => <Typography {...props} />)<PredefinedDateProps>`
  margin: 0 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  ${p => p.active && `color: ${p.theme.colors.primary}`}
  &:hover {
    color: ${p => p.theme.colors.primary}
  }
  transition: color 400ms linear;
`
