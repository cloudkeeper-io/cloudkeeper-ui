import React from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 30px 0 15px;
`

export const DatepickerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
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
  @media (max-width: 900px) {
    display: none;
  }
  &:first-of-type {
    margin: 0 16px 0 0;
  }
`
