import React, { memo, useContext, useEffect, useRef, useState } from 'react'
import styled, { ThemeContext } from 'styled-components/macro'
import { PieChart, Pie, ResponsiveContainer, Cell, Sector } from 'recharts'
import { Typography } from '@material-ui/core'
import { ChevronLeft } from 'react-feather'
import map from 'lodash/map'
import reduce from 'lodash/reduce'
import forEach from 'lodash/forEach'
import orderBy from 'lodash/orderBy'
import take from 'lodash/take'

import { ReactComponent as ScaleSvg } from './images/scale.svg'
import { formatNumber } from '../../utils'

const Title = styled(Typography)`
  margin: 10px 0 0 20px;
`
const Content = styled.div`
  display: flex;
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
  min-width: 250px;
  padding: 0 15px;
  @media(max-width: 800px) {
    min-width: auto;
  }
`
const Scale = styled(ScaleSvg)`
  margin-top: 15px;
`
const LeftSide = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`
const ChartWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 200px;
`
const InnerGraphContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  font-size: 32px;
  font-weight: 500;
  color: #8499B9;
  pointer-events: none;
`
const LegendItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 15px 0;
  cursor: pointer;
  border-bottom: 1px solid #EDF0F2;
  :first-child {
    border-top: 1px solid #EDF0F2;
  }
`
const LegendCell = styled.div<{ color: string }>`
  min-width: 12px;
  min-height: 12px;
  max-width: 12px;
  max-height: 12px;
  background-color: ${(p) => p.color};
  border-radius: 50%;
`
const LegendText = styled.div`
  font-size: 14px;
  line-height: 18px;
  margin-left: 10px;
`
const ActiveIndicator = styled.div`
  display: flex;
  flex: 1;
  height: 16px;
  justify-content: flex-end;
  align-items: center;
  color: ${(p) => p.theme.palette.primary.main};
`

const StyledSector = Sector as any

interface CostsPerStackProps {
  data: any[],
}

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props

  return (
    <g className="active-sector-shape">
      <StyledSector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        cornerRadius={10}
        stroke="#f4f4f4"
        strokeWidth={3}
        fill={fill}
        filter="url(#strokeShadow)"
        forceCornerRadius
      />
    </g>
  )
}


export const CostsPerStack = memo(({ data }: CostsPerStackProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { colors } = useContext(ThemeContext)
  const COLORS = colors.seriesColors

  const moveActiveToFront = () => {
    try {
      const { current } = wrapperRef
      const pieRef = current!.querySelector('.recharts-pie')
      const fakeNodes = pieRef!.querySelectorAll('.fake-node')

      forEach(fakeNodes, (node) => pieRef!.removeChild(node))

      const activePieSector = pieRef!.querySelector('.active-sector-shape')!.parentNode
      const clonedNode = activePieSector!.cloneNode(true) as any
      clonedNode.classList.add('fake-node')
      pieRef!.appendChild(clonedNode)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  }

  useEffect(() => {
    setTimeout(moveActiveToFront)
  })

  const dataKeys = reduce(data, (acc, x) => {
    forEach(x.stackCosts, (service) => {
      acc[service.stackName] = (acc[service.stackName] || 0) + service.unblendedCost
    })
    return acc
  }, {} as any)

  const orderedDataKeys = take(orderBy(map(dataKeys, (cost, name) => ({ cost, name })), 'cost', 'desc'), 5)

  return (
    <div ref={wrapperRef}>
      <Title variant="h5">Costs Per Stack</Title>
      <Content>
        <LeftSide>
          <ChartWrapper>
            <ResponsiveContainer height={200}>
              <PieChart margin={{ top: 20, right: 0, left: 0, bottom: 20 }}>
                <Pie
                  data={orderedDataKeys}
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  dataKey="cost"
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
                  minAngle={30}
                  cornerRadius={10}
                  onMouseEnter={(d, index) => setActiveIndex(index)}
                  onAnimationEnd={moveActiveToFront}
                >
                  {map(orderedDataKeys, (x, index) => (
                    <Cell key={x.name} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <InnerGraphContent>
              {formatNumber(orderedDataKeys[activeIndex].cost, 3)}$
            </InnerGraphContent>
          </ChartWrapper>
          <Scale />
        </LeftSide>
        <Legend>
          {map(orderedDataKeys, (stack, index) => (
            <LegendItem key={index} onClick={() => setActiveIndex(index)}>
              <LegendCell color={COLORS[index]} />
              <LegendText>
                {stack.name || 'Resources without a stack'}
              </LegendText>
              {activeIndex === index && (
                <ActiveIndicator>
                  <ChevronLeft />
                </ActiveIndicator>
              )}
            </LegendItem>
          ))}
        </Legend>
      </Content>
    </div>
  )
})
