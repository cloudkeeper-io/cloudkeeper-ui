import { createGlobalStyle } from 'styled-components/macro'
import 'react-dates/lib/css/_datepicker.css'
import 'react-toastify/dist/ReactToastify.css'

export default createGlobalStyle`
  html, body, #root {
    min-height: 100vh;
    background: ${(p: any) => p.theme.colors.mainBackground || p.theme.colors.background} no-repeat 100%  100% ;
    color: ${(p) => p.theme.colors.text};
  }

  body {
    margin: 0;
    padding: 0;
    * {
      font-family: ${(p) => p.theme.font}, sans-serif;
    }
  }
  
  div {
    color: ${(p) => p.theme.colors.text};
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }

  input {
    &:-webkit-autofill,
    &:-webkit-autofill:hover, 
    &:-webkit-autofill:focus, 
    &:-webkit-autofill:active  {
      transition-property: background-color, color;
      transition-delay: 99999999999s;
    }
  }

  .Toastify__toast-body {
    font-family: ${(p) => p.theme.font}, sans-serif;
  }
  
  // toast
  .Toastify__toast--default {
    background: ${(p) => p.theme.colors.background} no-repeat 100%  100% !important;
    color: ${(p) => p.theme.colors.text} !important;
    text-align: center;
    box-shadow: 0 0 4px ${(p) => p.theme.colors.shadow} !important;
  }

  .Toastify__close-button {
    color: ${(p) => p.theme.colors.primary} !important;
  }

  .Toastify__progress-bar  {
    background: ${(p) => p.theme.colors.primary} no-repeat 100%  100% !important;
  }
`
