import styled from 'styled-components/macro'

import Button from '../../components/button/button.component'
import Card from '../../components/card.component'
import IconButton from '../../components/button/icon-button.component'
import background from './images/light-background.svg'

const transitionTime = '0.4s cubic-bezier(0.9, 0.20, 0.20, 0.9)'

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
  min-height: calc(100vh - 60px);
  padding: 0 20px;
  transition: all ${transitionTime};
`
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const Title = styled.div`
  font-weight: 500;
  font-size: 32px;
  line-height: 40px;
  margin-top: 30px;
  text-align: center;
`
export const MainCard = styled(Card)`
  display: flex;
  width: 810px;
  height: 610px;
  justify-content: space-around;
  overflow: hidden;
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
`
export const SwitchWrapper = styled.div<{ isLogin: boolean }>`
  position: absolute;
  width: 810px;
  height: 100%;
  background: url("${background}") center center;
  background-size: cover;
  clip-path: ${p => (p.isLogin ?
    'polygon(0 0, 330px 0, 330px 100%, 0 100%)' :
    'polygon(490px 0, 100% 0, 100% 100%, 490px 100%)')};
  transition: all ${transitionTime};
  z-index: 30;
`
export const SwitchContent = styled.div<{ isLogin: boolean }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 330px;
  height: 100%;
  left: ${p => (p.isLogin ? 0 : '490px')};
  transition: left ${transitionTime};
  z-index: 30;
`
export const LeftContent = styled.div<{ isLogin: boolean }>`
  position: absolute;
  width: 480px;
  height: 100%;
  left: ${p => (p.isLogin ? '330px' : '0')};
  opacity: ${p => (p.isLogin ? '0' : '1')};
  z-index: ${p => (p.isLogin ? '-1' : '20')};
  overflow: hidden;
  transition: left ${transitionTime}, z-index ${transitionTime}, opacity ${transitionTime};
`
export const RightContent = styled.div<{ isLogin: boolean }>`
  position: absolute;
  width: 480px;
  left: ${p => (p.isLogin ? '330px' : '0')};
  opacity: ${p => (p.isLogin ? '1' : '0')};
  z-index: ${p => (p.isLogin ? '20' : '-1')};
  transition: left ${transitionTime}, z-index ${transitionTime}, opacity ${transitionTime};
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
