import React, { useRef, useContext } from 'react'
import styled from 'styled-components/macro'
import { useMediaQuery } from '@material-ui/core'
import { useQuery } from 'react-apollo'
import useComponentSize from '@rehooks/component-size'
import map from 'lodash/map'
import get from 'lodash/get'

import { mobileMediaQuery } from '../../utils'
import Card from '../../components/card.component'
import ReactGridLayout from '../../components/grid-layout.component'
import { dashboardQuery } from '../../graphql/queries'
import { TenantContext } from '../../contexts'
import { useInterval } from '../../hooks'
import Processing from '../../components/processing.component'
import SetupTenant from './components/setup-tenant.component'
import Loading from '../../components/spinners/loading.component'

const Wrapper = styled.div`
  padding: 0 20px;
  overflow: hidden;
  @media (${mobileMediaQuery}) {
    padding: 0 10px;
  }
`

const POLL_INTERVAL = 30 * 60 * 1000 // 30 min
const PROCESSING_REFETCH_DELAY = 10000 // 10 sec

export default () => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { currentTenant, tenantId } = useContext(TenantContext)

  const { data, loading, error, refetch } = useQuery(dashboardQuery, {
    variables: { tenantId },
    pollInterval: POLL_INTERVAL,
  })
  const isProcessing = get(data, 'lambdasData.processing') || get(data, 'dynamoData.processing')

  const wrapperSize = useComponentSize(wrapperRef)
  const isMobile = useMediaQuery(`(${mobileMediaQuery})`)

  useInterval(refetch, PROCESSING_REFETCH_DELAY, isProcessing)

  const layout = [
    { x: 0, y: 0, w: 4, h: 2, i: '0' },
    { x: 4, y: 0, w: 4, h: 2, i: '1' },
    { x: 8, y: 0, w: 4, h: 4, i: '2' },
    { x: 0, y: 1, w: 4, h: 2, i: '3' },
    { x: 4, y: 1, w: 4, h: 2, i: '4' },
    { x: 0, y: 3, w: 12, h: 3, i: '5' },
  ]

  if (loading) {
    return <Loading height="calc(100vh - 60px)" />
  }

  if (error) {
    throw error
  }

  if (!currentTenant!.isSetupCompleted) {
    return <SetupTenant tenant={currentTenant!} />
  }

  if (isProcessing) {
    return <Processing />
  }

  return (
    <Wrapper ref={wrapperRef}>
      <ReactGridLayout
        layout={layout}
        cols={isMobile ? 1 : 12}
        width={wrapperSize.width - 20}
        rowHeight={125}
      >
        {map(layout, item => (
          <Card key={item.i}>
            {item.i}
          </Card>
        ))}
      </ReactGridLayout>
    </Wrapper>
  )
}
