import styled from 'styled-components/macro'
import MaterialTabs from '@material-ui/core/Tabs'

import Button from '../../components/button/button.component'
import Card from '../../components/card.component'
import IconButton from '../../components/button/icon-button.component'

const transitionTime = '0.4s cubic-bezier(0.9, 0.20, 0.20, 0.9)'
const shortTime = '0.3s cubic-bezier(0.9, 0.90, 0.90, 0.9)'

export const StyledForm = styled.form`
  width: 100%;
  min-height: 300px;
`
export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 25px 15px 25px;
  justify-content: space-around;
`
export const LoginButton = styled(Button)`
  border: 2px solid white;
  background: transparent;
  box-shadow: none;
  &:hover {
    background: transparent;
  }
`
export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: calc(100vh - 64px);
  padding: 0;
  @media (max-width: 900px) {
    padding: 0 20px;
  }
`
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`
export const Tabs = styled(MaterialTabs)`
  display: none;
  @media (max-width: 900px) {
    display: block;
  }
`
export const Title = styled.div`
  font-weight: 500;
  font-size: 32px;
  line-height: 40px;
  margin-top: 30px;
  text-align: center;
  padding: 0 20px;
  color: ${(p) => p.theme.login.headerColor};
`
export const MainCard = styled(Card)`
  display: flex;
  width: 810px;
  max-width: 90vw;
  height: 610px;
  justify-content: space-around;
  overflow: hidden;
  @media (max-width: 900px) {
     height: auto;
     min-height: 710px;
  }
`
export const SocialWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
`
export const SocialButton = styled(IconButton)`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 10px;
`
export const Text = styled.div`
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #9A9DAD;
  padding: 0 10px;
`
export const SwitchWrapper = styled.div<{ isLogin: boolean }>`
  position: absolute;
  width: 810px;
  height: 100%;
  background: url("${(p) => p.theme.login.background}") center center;
  background-size: cover;
  clip-path: ${(p) => (p.isLogin ?
    'polygon(0 0, 330px 0, 330px 100%, 0 100%)' :
    'polygon(490px 0, 100% 0, 100% 100%, 490px 100%)')};
  transition: clip-path ${transitionTime};
  z-index: 30;
  @media (max-width: 900px) {
   display: none;
  }
`
export const SwitchContent = styled.div<{ isLogin: boolean }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 330px;
  height: 100%;
  left: ${(p) => (p.isLogin ? 0 : '490px')};
  transition: left ${transitionTime};
  z-index: 30;
`
export const LeftContent = styled.div<{ isLogin: boolean }>`
  position: absolute;
  width: 480px;
  height: 100%;
  left: ${(p) => (p.isLogin ? '330px' : '0')};
  opacity: ${(p) => (p.isLogin ? '0' : '1')};
  z-index: ${(p) => (p.isLogin ? '-1' : '10')};
  overflow: hidden;
  transition: left ${transitionTime}, z-index ${transitionTime}, opacity ${shortTime};
  @media (max-width: 900px) {
    top: 50px;
    left: 0;
    width: 100%;
    height: calc(100% - 50px);
  }
`
export const RightContent = styled.div<{ isLogin: boolean }>`
  position: absolute;
  width: 480px;
  left: ${(p) => (p.isLogin ? '330px' : '0')};
  opacity: ${(p) => (p.isLogin ? '1' : '0')};
  z-index: ${(p) => (p.isLogin ? '10' : '-1')};
  transition: left ${transitionTime}, z-index ${transitionTime}, opacity ${shortTime};
  @media (max-width: 900px) {
    top: 50px;
    left: 0;
    width: 100%;
    height: calc(100% - 50px);
  }
`
export const SwitchText = styled.div`
  margin: 20px 10px;
  color: #FFFFFF;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
`
export const SwitchTitle = styled.div`
  margin: 20px 10px;
  color: #FFFFFF;
  font-weight: bold;
  font-size: 32px;
  line-height: 40px;
  text-align: center;
`
