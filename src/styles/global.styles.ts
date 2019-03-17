import { createGlobalStyle } from 'styled-components/macro'

export default createGlobalStyle`
  html, body, #root {
    min-height: 100vh;
    background: ${(p: any) => p.theme.colors.backgroundGradient || p.theme.colors.background} no-repeat 100%  100% ;
    color: ${p => p.theme.colors.text};
  }
  
  body {
    margin: 0;
    padding: 0;
    * {
      font-family: Montserrat, sans-serif;
    }
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
`
