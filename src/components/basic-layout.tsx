import styled from 'styled-components/macro'

export default styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: ${p => p.theme.colors.background};
  color: ${props => props.theme.colors.text};
`
