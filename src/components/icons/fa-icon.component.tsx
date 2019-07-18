import React from 'react'
import styled from 'styled-components/macro'
import { FontAwesomeIcon, Props as FaIconProps } from '@fortawesome/react-fontawesome'

interface IconProps extends FaIconProps {
  color?: string
  children?: JSX.Element
  onClick?: () => void
}

const StyledIcon = styled(FontAwesomeIcon)<IconProps>`
  color: ${p => p.color || p.theme.icon.color};
  text-shadow: 0 0 4px #4FFAC5;
  transition: all 0.5s;
`

const FaIcon = ({ size = 'lg', children, color, ...props }: IconProps) => (
  <StyledIcon size={size} color={color} {...props}>
    {children}
  </StyledIcon>
)

export default styled(FaIcon)``
