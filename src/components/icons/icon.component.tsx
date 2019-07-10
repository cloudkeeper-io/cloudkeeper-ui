import React from 'react'
import styled from 'styled-components/macro'

import icons, { IconsType } from './svgs'

const defaultSize = 18
const defaultColor = 'black'

interface IconProps {
  icon: IconsType | string
  className?: string
  size?: number
  color?: string
  active?: boolean
  isSubLink?: boolean
  onClick?: any
}

export default class Icon extends React.PureComponent<IconProps> {
  public render() {
    const { className, ...props } = this.props
    const icon = icons[props.icon]
    const component = icon || icons.logo

    const Svg = styled(component)<IconProps>`
    width: ${({ size = defaultSize }) => size}px;
    height: ${({ size = defaultSize }) => size}px;
    fill: ${({ color = defaultColor }) => color};
  `
    const filteredProps = { ...props }
    delete filteredProps.active
    delete filteredProps.isSubLink
    return <Svg className={className} {...filteredProps} />
  }
}
