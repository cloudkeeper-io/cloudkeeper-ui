import styled from 'styled-components/macro'
import Button from '../../../components/button/button.component'

export const StyledForm = styled.form`
  width: 100%;
  min-height: 300px;
`
export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: calc(100% - 50px);
  padding: 25px;
  justify-content: space-around;
`
export const ServerError = styled.div`
  color: #ff1744;
  font-size: 12px;
  text-align: center;
  margin-bottom: 10px;
  height: 20px;
`
export const SubmitButton = styled(Button)`
  ${Button.Content} {
    &:disabled {
      background: ${p => p.theme.buttons.primary.disabled};
    }
    &:active,
    &:hover {
      background: ${p => p.theme.buttons.primary.active};
    }
  }
`
