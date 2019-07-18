import React from 'react'
import styled from 'styled-components/macro'
import { mix } from 'polished'
import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core'
import Fab from '@material-ui/core/Fab'

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
  transition: 0.5s background;
  outline: none;
  &:hover {
    background: ${p => mix(0.85, p.theme.buttons.icon.background, p.theme.colors.primary)};
  }
`

const ThemedFab = styled(Fab)`
  background: ${p => p.theme.icon.background};
  color: ${p => p.theme.icon.color};
  border: ${p => p.theme.icon.border};
  ${FaIcon} {
    font-size: 22px;
  }
  &:hover {
    text-decoration: none;
    background-color: ${p => p.theme.icon.hoverColor};\
  }
`

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string,
  size?: 'small' | 'medium' | 'large',
  icon?: IconProp,
  iconSize?: SizeProp,
  color?: 'primary' | 'secondary' | 'default' | 'inherit',
}

const IconButton = ({ className, icon, size = 'medium', ...props }: IconButtonProps) => (
  <ThemedFab className={className} size={size} {...props}>
    <FaIcon icon={icon!} />
  </ThemedFab>
)

IconButton.Wrapper = Wrapper
IconButton.Icon = FaIcon

export default IconButton
