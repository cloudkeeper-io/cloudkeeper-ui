import React from 'react'
import styled from 'styled-components/macro'

import Input from './input.component'
import Icon from '../icons/icon.component'
import { IconsType } from '../icons/svgs'

const Wrapper = styled.div`
  position: relative;
`
const StyledInput = styled(Input)`
  padding: 0 50px;
  width: calc(100% - 100px);
`
const StyledIcon = styled(Icon)`
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translate(0, -50%);
  fill: none !important;
  stroke: ${(p) => p.theme.input.iconColor};
`

interface IconInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: IconsType
}

export default ({ icon, className, ...props }: IconInputProps) => (
  <Wrapper className={className}>
    <StyledIcon icon={icon} size={20} />
    <StyledInput {...props as any} />
  </Wrapper>
)
