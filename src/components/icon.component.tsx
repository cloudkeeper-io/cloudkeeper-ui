import React from 'react'
import styled from 'styled-components/macro'
import { FontAwesomeIcon, Props as FaIconProps } from '@fortawesome/react-fontawesome'
import { transparentize } from 'polished'

interface IconProps extends FaIconProps {
  children?: JSX.Element
  onClick?: () => void
}

const StyledIcon = styled(FontAwesomeIcon)<IconProps>`
  color: ${p => p.theme.colors.icon};
  text-shadow: 0 0 4px #4FFAC5;
  filter: ${p => `drop-shadow(0px 0px 2px ${transparentize(0.85, p.theme.colors.icon)})`};
  transition: all 0.5s;
`
const Icon = ({ size = 'lg', children, ...props }: IconProps) => (
  <StyledIcon size={size} {...props}>
    {children}
  </StyledIcon>
)

export default styled(Icon)``
