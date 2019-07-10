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
  box-sizing: initial;
  &:focus, &:active {
    border: solid ${p => p.theme.input.border};
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover, 
  &:-webkit-autofill:focus, 
  &:-webkit-autofill:active  {
    -webkit-box-shadow: 0 0 0 30px transparent inset !important;
    -webkit-text-fill-color: ${p => p.theme.input.color} !important;
    transition-property: background-color, color;
    transition-delay: 99999999999s;
  }
  ::placeholder {
    color: ${p => p.theme.input.placeholder};
  }
`
