import { Card } from '@material-ui/core'
import styled from 'styled-components/macro'

export default styled(Card)<{ background?: string }>`
  position: relative;
  width: auto;
  background: ${(p) => p.theme.card.background};
  border-radius: ${(p) => p.theme.card.borderRadius};
  box-shadow:  ${(p) => p.theme.card.shadow};
`
