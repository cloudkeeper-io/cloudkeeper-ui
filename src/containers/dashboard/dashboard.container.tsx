import React, { useEffect, useRef, useState } from 'react'
import debounce from 'lodash-es/debounce'

import styled from 'styled-components'
import { useMeasure } from 'react-use'
import { DataContainer } from '../common/data-container/data.container'
import { DashboardDataContainer } from './dasboard-data.container'

const Wrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 64px);
  overflow: hidden;
`

export default () => {
  const [wrapperRef, { width }] = useMeasure()
  const [debouncedWidth, setDebouncedWidth] = useState(width)
  const debounceFn = useRef(debounce((newValue: number) => setDebouncedWidth(newValue), 100))

  useEffect(() => debounceFn.current(width), [width])

  return (
    <Wrapper ref={wrapperRef}>
      <DataContainer>
        <DashboardDataContainer width={debouncedWidth} />
      </DataContainer>
    </Wrapper>
  )
}
