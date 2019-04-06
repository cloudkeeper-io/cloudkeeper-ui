import styled from 'styled-components/macro'
import { Text } from '../typography.component'

export const Wrapper = styled.div`
`
export const HeaderWrapper = styled.div<{ background?: string }>`
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  width: 100vw;
  background: ${p => p.background || p.theme.colors.transparentBackground};
  height: 60px;
  z-index: 8;
`
export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: calc(100% - 20px);
  padding: 0 15px 0 5px;
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
   @media (max-width: 800px) {
     margin-top: 60px;
     width: 100%;
   }
`
export const Flex = styled.div`
  flex: 1;
`
export const TenantName = styled(Text)`
  margin-left: 10px;
  color: ${p => p.theme.colors.primary};
  max-width: 75px;
  text-overflow: ellipsis;
  overflow: hidden;
`
