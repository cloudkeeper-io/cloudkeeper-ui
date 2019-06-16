import React from 'react'
import styled from 'styled-components/macro'

import Icon from './icon.component'

interface IArrow {
  direction: string
  size?: number
  style?: object
}

const ArrowIcon = styled(Icon as any)<IArrow>`
  margin-left: 5px;
  transform: ${p => (p.direction === 'up' ? 'rotate(0)' : 'rotate(180deg)')};
  path {
    fill: ${p => (p.direction === 'up' ? '#91C900' : '#D64154')};
  }
`

export const Arrow = ({ direction, size = 14, ...props }: IArrow) => (
  <ArrowIcon
    direction={direction}
    icon="arrowFill"
    size={size}
    {...props}
  />
)
