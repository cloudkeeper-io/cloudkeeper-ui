import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  html, body, #root {
    height: 100%;
  }
  
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
`
