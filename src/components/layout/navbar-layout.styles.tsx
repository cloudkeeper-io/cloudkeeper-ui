import styled from 'styled-components'

import Sidebar from '../sidebar.component'

export const Wrapper = styled.div`
`
export const StyledSidebar = styled(Sidebar)`
  top: 80px;
  @media (max-width: 800px) {
    top: 0;
  }
`
export const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  width: 100vw;
  background: ${p => p.theme.colors.background};
  box-shadow: 0 2px 8px ${p => p.theme.colors.shadow};
  height: 60px;
  z-index: 8;
`
export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: calc(100% - 20px);
  padding: 0 20px;
  color:  ${p => p.theme.colors.text};
  @media (max-width: 800px) {
    height: 30px;
    padding: 15px;
  }
`
export const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
`
export const PageContent = styled.div`
   margin-top: 60px;
   width: 100%;
   transition: 0.5s all;
   @media (max-width: 800px) {
     margin-top: 60px;
     width: 100%;
   }
`
export const Flex = styled.div`
  flex: 1;
`
