import React, { useContext } from 'react'
import styled from 'styled-components/macro'
import get from 'lodash/get'

import SetupTenant from '../../components/tenant/setup-tenant.component'
import Processing from '../../components/processing.component'
import { TenantContext } from '../../contexts'
import { useInterval } from '../../hooks'
import { DataContainer } from '../common/data-container/data.container'
import { LambdasDataContainer } from './lambdas-data.container'

const Wrapper = styled.div`
  position: relative;
  padding: 0 28px 20px;
  overflow-x: hidden;
  height: calc(100vh - 64px);
  @media (max-width: 800px) {
    padding: 0 15px 20px;
  }
`

export default () => {
  const { currentTenant, refetch } = useContext(TenantContext)

  const isProcessing = !get(currentTenant, 'initialProcessing.done', false)

  useInterval(refetch, 10000, isProcessing)

  if (!currentTenant.isSetupCompleted) {
    return <SetupTenant tenant={currentTenant} />
  }

  if (isProcessing) {
    return <Processing />
  }

  return (
    <Wrapper>
      <DataContainer>
        <LambdasDataContainer />
      </DataContainer>
    </Wrapper>
  )
}
