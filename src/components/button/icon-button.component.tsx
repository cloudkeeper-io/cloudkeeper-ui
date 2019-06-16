import React from 'react'
import styled from 'styled-components/macro'
import { mix, transparentize } from 'polished'
import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core'

import FaIcon from '../icons/fa-icon.component'

const Wrapper = styled.button<{ size: string }>`
  min-width: ${p => p.size};
  max-width: ${p => p.size};
  min-height: ${p => p.size};
  max-height: ${p => p.size};
  border: none;
  border-radius: 50%;
  cursor: pointer;
  background: ${p => p.theme.buttons.icon.background};
  box-shadow: 0 0 4px ${p => transparentize(0.5, p.theme.colors.primary)};
  transition: 0.5s background;
  outline: none;
  &:hover {
    background: ${p => mix(0.85, p.theme.buttons.icon.background, p.theme.colors.primary)};
  }
`

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string,
  size?: string,
  icon?: IconProp,
  iconSize?: SizeProp,
}

const IconButton = ({ className, icon, size = '50px', iconSize = '2x', ...props }: IconButtonProps) => (
  <Wrapper className={className} size={size} {...props}>
    <FaIcon size={iconSize} icon={icon!} />
  </Wrapper>
)

IconButton.Wrapper = Wrapper
IconButton.Icon = FaIcon

export default IconButton
