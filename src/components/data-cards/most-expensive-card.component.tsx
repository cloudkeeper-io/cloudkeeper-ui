import React from 'react'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'
import filter from 'lodash/filter'
import { Typography } from '@material-ui/core'
import styled from 'styled-components'

import { useSwitchTab } from '../../hooks'
import {
  StyledCard,
  Content,
  Header,
  Text,
  TabIndicator,
  Tab,
} from './data-card.styles'
import {
  DashboardData_mostExpensiveDynamoTables as DynamoTablesData,
  DashboardData_mostExpensiveLambdas as LambdasData,
} from '../../graphql/queries/dashboard/types/DashboardData'

const Placeholder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex: 1;
`

interface TopDynamoCardProps {
  lambdaData: LambdasData[]
  dynamoData: DynamoTablesData[]
  className?: string
}

interface Tab {
  name: string
  data: (LambdasData | DynamoTablesData)[]
}

export const MostExpensiveCard = (props: TopDynamoCardProps) => {
  const { lambdaData, dynamoData, className } = props

  const tabs: Tab[] = filter([{
    name: 'Lambda Functions',
    data: lambdaData,
  }, {
    name: 'DynamoDB Tables',
    data: dynamoData,
  }], (tab) => !isEmpty(tab.data))

  const [tab, setTab] = useSwitchTab(0, tabs.length, 0)

  const currentTab = tabs[tab > tabs.length - 1 ? 0 : tab]

  return (
    <StyledCard className={className}>
      <Content>
        {
          isEmpty(tabs) && (
            <>
              <Header>
                <Typography variant="h5">
                  Top Expensive Lambdas
                </Typography>
              </Header>
              <Placeholder>
                <Typography variant="h6">
                No Data Available
                </Typography>
              </Placeholder>
            </>
          )
        }
        {!isEmpty(tabs) && (
        <Tab>
          <Header>
            <Typography variant="h5">
              {`Top ${currentTab.data.length} Expensive ${currentTab.name}`}
            </Typography>
            {tabs.length > 1 && <TabIndicator index={tab} steps={tabs.length} onClick={(i) => setTab(i)} />}
          </Header>
          <>
            {map(currentTab.data, (x) => (
              <Text key={x.name}>
                <div>{x.name}</div>
                <div>{`$ ${(x.cost).toLocaleString('en')}`}</div>
              </Text>
            ))}
          </>
        </Tab>
        )}
      </Content>
    </StyledCard>
  )
}
