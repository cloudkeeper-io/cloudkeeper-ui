import * as React from 'react'
import styled from 'styled-components'

interface SidebarProps {
  isOpen: boolean
  children: JSX.Element | JSX.Element []
  className?: string
  width?: number
  noOverlay?: boolean
  onStateChange: (isOpen: boolean) => void
}

interface WrapperProps {
  isOpen: boolean
  width: number
}

interface OverlayProps {
  noOverlay: boolean
  isOpen: boolean
}

const Wrapper = styled.div<WrapperProps>`
  position: fixed;
  left: ${p => p.isOpen ? 0 : `-${p.width}px`};
  width: ${p => `${p.width}px`};
  background-color: white;
  transition: 0.5s all;
  height: 100%;
  z-index: 6;
  @media (max-width: 800px) {
    z-index: 9;
  }
`
const Overlay = styled.div<OverlayProps>`
  display: block;
  position: fixed;
  visibility: ${p => p.isOpen && !p.noOverlay ? 'visible' : 'hidden'};
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  cursor: pointer;
  opacity: ${p => p.isOpen && !p.noOverlay ? 1 : 0};
  background-color: rgba(0,0,0, 0.33);
  transition: 0.5s all;
  z-index: 6;
`

export default class extends React.PureComponent<SidebarProps> {
  public render() {
    const { isOpen, width = 250, onStateChange, noOverlay = false, className, children } = this.props

    return (
      <>
        <Wrapper isOpen={isOpen} width={width} className={className}>
          {children}
        </Wrapper>
        <Overlay isOpen={isOpen} noOverlay={noOverlay} onClick={() => onStateChange(false)} />
      </>
    )
  }
}
