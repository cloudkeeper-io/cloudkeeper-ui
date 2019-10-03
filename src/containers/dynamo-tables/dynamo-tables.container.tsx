import React from 'react'
import styled from 'styled-components/macro'

import { DataContainer } from '../common/data-container/data.container'
import { DynamoTablesDataContainer } from './dynamo-tables-data.container'

const Wrapper = styled.div`
  position: relative;
  padding: 0 28px 20px;
  overflow-x: hidden;
  height: calc(100vh - 64px);
  @media (max-width: 800px) {
    padding: 0 15px 20px;
  }
`

export default () => (
  <Wrapper>
    <DataContainer>
      <DynamoTablesDataContainer />
    </DataContainer>
  </Wrapper>
)
