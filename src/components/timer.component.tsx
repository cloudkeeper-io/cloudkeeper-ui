import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  .wrapper {
    position: relative;
    margin: 40px auto;
    background: white;
  }
  
  .wrapper, .wrapper * {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  
  .wrapper {
    width: 250px;
    height: 250px;
  }
  
  .wrapper .pie {
    width: 50%;
    height: 100%;
    transform-origin: 100% 50%;
    position: absolute;
    background: #08C;
    border: 5px solid rgba(0,0,0,0.5);
  }
  
  .wrapper .spinner {
    border-radius: 100% 0 0 100% / 50% 0 0 50%;
    z-index: 200;
    border-right: none;
    animation: rota 10s linear infinite;
  }
  
  .wrapper:hover .spinner,
  .wrapper:hover .filler,
  .wrapper:hover .mask {
    animation-play-state: running;
  }
  
  .wrapper .filler {
    border-radius: 0 100% 100% 0 / 0 50% 50% 0;
    left: 50%;
    opacity: 0;
    z-index: 100;
    animation: opa 5s steps(1, end) infinite reverse;
    border-left: none;
  }
  
  .wrapper .mask {
    width: 50%;
    height: 100%;
    position: absolute;
    background: inherit;
    opacity: 1;
    z-index: 300;
    animation: opa 5s steps(1, end) infinite;
  }
  
  @keyframes rota {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes opa {
    0% {
      opacity: 1;
    }
    50%, 100% {
      opacity: 0;
    }
  }
`

export default () => (
  <Wrapper>
    <div className="wrapper">
      <div className="pie spinner" />
      <div className="pie filler" />
      <div className="mask" />
    </div>
  </Wrapper>
)
