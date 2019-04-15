import styled from 'styled-components/macro'

import Button from '../../../../components/button/button.component'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  align-items: center;
  min-height: calc(100vh - 80px);
  margin-top: -60px;
  padding: 60px 20px 20px 20px;
  background-size: contain;
`
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(100% - 70px);
  height: calc(100% - 65px);
  padding: 10px 30px 20px 40px;
  font-size: 12px;
  line-height: 18px;
`
export const Text = styled.div`
  margin-bottom: 10px;
`
export const ButtonWrapper = styled.div`
  display: flex;
  position: relative;
  margin-top: 35px;
  justify-content: space-between;
  width: 100%;
`
export const NavigationButton = styled(Button)`
  width: 150px;
  height: 40px;
  max-width: 45%;
`
