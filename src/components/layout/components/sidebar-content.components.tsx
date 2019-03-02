import * as React from 'react'
import styled from 'styled-components'

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  width: 249px;
  background: #FFFFFF;
  height: calc(100% - 80px);
  transition: 0.5s all;
  border-right: 1px solid rgba(0,0,0, 0.1);
  @media (max-width: 800px) {
    height: 100%;
  }
`
const Links = styled.div`
  flex: 1;
  padding-top: 10px;
  overflow: auto;
  @media (max-width: 800px) {
    height: 100%;
  }
`

interface SidebarContentProps {
  children: React.ReactChildren | JSX.Element[]
}

export const SidebarContent = ({ children }: SidebarContentProps) => (
  <Content>
    <Links>
      {children}
    </Links>
  </Content>
)
