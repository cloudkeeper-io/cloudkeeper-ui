/* eslint-disable react/no-array-index-key */
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import styled, { ThemeContext } from 'styled-components/macro'
import { PieChart, Pie, ResponsiveContainer, Cell, Sector } from 'recharts'
import { lighten } from 'polished'
import map from 'lodash/map'
import times from 'lodash/times'
import forEach from 'lodash/forEach'
import { Typography } from '@material-ui/core'


const Title = styled(Typography)`
  margin: 10px 0 0 20px;
`
const ChartWrapper = styled.div`
  display: flex;
  margin: 30px;
  justify-content: space-between;
  width: 100%;
  height: auto;
  svg {
    overflow: visible;
  }
`
const Legend = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 300px;
  padding: 0 15px;
  @media(max-width: 800px) {
    min-width: auto;
  }
`
const LegendItem = styled.div`
  display: flex;
  margin: 10px 0;
`
const LegendCell = styled.div<{ color: string }>`
  width: 16px;
  height: 16px;
  background-color: ${p => p.color};
  border-radius: 50%;
`
const LegendText = styled.div`
  font-size: 12px;
  line-height: 14px;
  margin-left: 10px;
`

const split = ['Train fraction', 'Dev fraction', 'Test fraction']

interface CostsPerStackProps {
  data: any[],
}

const DATA = [123, 123, 123]

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props

  return (
    <g className="active-sector-shape">
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={innerRadius - 3}
        outerRadius={outerRadius + 3}
        cornerRadius={10}
        stroke="white"
        strokeWidth={3}
        fill={fill}
        filter="url(#strokeShadow)"
      />
    </g>
  )
}


export const CostsPerStack = ({ data }: CostsPerStackProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { palette } = useContext(ThemeContext)
  const COLORS = useMemo(() => times(5, index => lighten(index * 0.1, palette.primary.dark)), [palette])
  // console.log(data)

  useEffect(() => {
    setTimeout(() => {
      const { current } = wrapperRef
      const pieRef = current!.querySelector('.recharts-pie')
      const fakeNode = pieRef!.querySelectorAll('.fake-node')

      forEach(fakeNode, node => pieRef!.removeChild(node))

      const activePieSector = pieRef!.querySelector('.active-sector-shape')!.parentNode
      const clonedNode = activePieSector!.cloneNode(true) as any
      clonedNode.classList.add('fake-node')
      pieRef!.appendChild(clonedNode)
    })
  })

  return (
    <div ref={wrapperRef}>
      <Title variant="h5">Costs Per Stack</Title>
      <ChartWrapper>
        <ResponsiveContainer height={200}>
          <PieChart margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
            <Pie
              data={map(DATA, x => ({ value: x }))}
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              animationBegin={0}
              animationDuration={1250}
              startAngle={450}
              endAngle={90}
              stroke="transparent"
              paddingAngle={-12}
              cornerRadius={10}
              onMouseEnter={(d, index) => setActiveIndex(index)}
            >
              {data.map((x, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <Legend>
          {data.map((user, index) => (
            <LegendItem key={index}>
              <LegendCell color={COLORS[index]} />
              <LegendText>
                {split[index]}
              </LegendText>
            </LegendItem>
          ))}
        </Legend>
        <svg viewBox="0 0 16 16">
          <use xlinkHref="#activeShapeTest" />
        </svg>
      </ChartWrapper>
    </div>
  )
}
