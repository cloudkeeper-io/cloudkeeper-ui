import styled from 'styled-components/macro'

import Select from '../tenant-select.component'

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
  width: 100%;
  margin-top: 60px;
`
export const Flex = styled.div`
  flex: 1;
`
export const TenantSelect = styled(Select)`
  margin-top: 10px;
`
