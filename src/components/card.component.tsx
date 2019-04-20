import styled from 'styled-components/macro'

export default styled.div<{ background?: string }>`
  position: relative;
  width: auto;
  border-radius: ${p => p.theme.card.borderRadius};
  box-shadow: 0 0 8px ${p => p.theme.card.shadow};
  background: ${p => p.background || p.theme.card.background};
`
