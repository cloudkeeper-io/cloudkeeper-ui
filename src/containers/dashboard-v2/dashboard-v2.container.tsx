import React, { useRef } from 'react'
import styled from 'styled-components/macro'
import { useMediaQuery } from '@material-ui/core'
import useComponentSize from '@rehooks/component-size'
import map from 'lodash/map'

import { mobileMediaQuery } from '../../utils'
import Card from '../../components/card.component'
import ReactGridLayout from '../../components/grid-layout.component'

const Wrapper = styled.div`
  padding: 0 20px;
  overflow: hidden;
`

export default () => {
  const isMobile = useMediaQuery(`(${mobileMediaQuery})`)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const wrapperSize = useComponentSize(wrapperRef)

  const layout = [
    { x: 0, y: 0, w: 4, h: 2, i: '0' },
    { x: 4, y: 0, w: 4, h: 2, i: '1' },
    { x: 8, y: 0, w: 4, h: 4, i: '2' },
    { x: 0, y: 1, w: 4, h: 2, i: '3' },
    { x: 4, y: 1, w: 4, h: 2, i: '4' },
    { x: 0, y: 3, w: 12, h: 3, i: '5' },
  ]

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
