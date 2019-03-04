import { createGlobalStyle } from 'styled-components/macro'

export default createGlobalStyle`
  html, body, #root {
    height: 100%;
    background: ${(p: any) => p.theme.colors.background};
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
