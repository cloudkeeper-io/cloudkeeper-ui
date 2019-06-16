import styled from 'styled-components/macro'

export default styled.input`
  background: ${p => p.theme.input.background} !important;
  width: calc(100% - 64px);
  height: 52px;
  border: solid transparent;
  border-width: 0 0 1px 0 !important;
  color: ${p => p.theme.input.color};
  font-weight: 500;
  line-height: 20px;
  font-size: 16px;
  padding: 0 32px;
  outline: none;
  margin: 10px 0;
  &:focus, &:active {
    border: solid ${p => p.theme.input.border};
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover, 
  &:-webkit-autofill:focus, 
  &:-webkit-autofill:active  {
    -webkit-box-shadow: 0 0 0 30px ${p => p.theme.input.background} inset !important;
    -webkit-text-fill-color: ${p => p.theme.input.color} !important;
    transition: background-color 999999999s ease-in-out 0s;
  }
  ::placeholder {
    color: ${p => p.theme.input.placeholder};
  }
`
