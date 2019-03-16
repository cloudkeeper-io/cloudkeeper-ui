import * as React from 'react'
import styled from 'styled-components/macro'

import Card from '../components/card.component'

const StyledCard = styled(Card)`
  width: 450px;
  min-height: 300px;
`

export default () => (
  <StyledCard>
    <div>Oh, Hi Mars</div>
  </StyledCard>
)
