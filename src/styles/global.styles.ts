import { createGlobalStyle } from 'styled-components/macro'
import 'react-dates/lib/css/_datepicker.css'
import 'react-toastify/dist/ReactToastify.css'

export default createGlobalStyle`
  html, body, #root {
    min-height: 100vh;
    color: ${p => p.theme.colors.text};
  }
  
  #root {
      background: ${(p: any) => p.theme.colors.mainBackground || p.theme.colors.background} no-repeat 100%  100%;
  }
  
  body {
    margin: 0;
    padding: 0;
    * {
      font-family: ${p => p.theme.font}, sans-serif;
    }
  }
  
  div {
    color: ${p => p.theme.colors.text};
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
  
  // toast
  .Toastify__toast--default {
    background: ${p => p.theme.colors.background} no-repeat 100%  100% !important;
    color: ${p => p.theme.colors.text} !important;
    text-align: center;
    box-shadow: 0 0 4px ${p => p.theme.colors.shadow} !important;
  }
  
  .Toastify__close-button {
    color: ${p => p.theme.colors.primary} !important;
  }
  
  .Toastify__progress-bar  {
    background: ${p => p.theme.colors.primary} no-repeat 100%  100% !important;
  }
  
    // modal
  .ReactModal__Body--open {
    overflow-y: hidden;
  }
  .ReactModal__Content {
    position: relative !important;
    transition: all 0.25s ease-in-out;
    transform: translate(0, 0) !important;
    top: auto !important;
    left: auto !important;
    opacity: 0;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    border: 2px solid ${p => p.theme.card.borderColor} !important;
    background: ${p => p.theme.colors.background} !important;
    border-radius: ${p => p.theme.card.borderRadius} !important;
  }

  .ReactModal__Content--after-open {
    opacity: 1;
    transform: translateY(0);
  }

  .ReactModal__Content--before-close {
    opacity: 0;
    transform: translateY(30px);
  }

  .ReactModal__Overlay {
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.4) !important;
    transition: opacity 0.25s ease-in-out;
    z-index: 15;
  }

  .ReactModal__Overlay--after-open {
     opacity: 1;
   }

  .ReactModal__Overlay--before-close {
     opacity: 0;
   }
`
