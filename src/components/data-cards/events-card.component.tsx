import React, { memo } from 'react'
import styled from 'styled-components/macro'
import { Typography } from '@material-ui/core'
import moment from 'moment'
import map from 'lodash/map'

import { Icon } from '../icons'

const Wrapper = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding-bottom: 20px;
`
const Title = styled(Typography)`
  margin: 10px 0 15px 20px;
`
const Event = styled.div`
  display: flex;
  padding: 5px 20px;
  justify-content: space-between;
  align-items: center;
`
const Message = styled.div`
  flex: 1;
  margin-left: 15px;
`
const Time = styled.div`
  width: 100px;
  text-align: right;
`

const getIconByServiceName = (serviceName: string) => {
  switch (serviceName) {
    case 'AWS Lambda':
      return 'lambda'
    case 'AWS Dynamo':
      return 'dynamo'
    default:
      return 'lambda'
  }
}

interface EventsCardProps {
  events: any[],
}

export const EventsCard = memo(({ events }: EventsCardProps) => (
  <Wrapper>
    <Title variant="h5">Events</Title>
    {map(events, (event, index) => (
      <Event key={index}>
        <Icon icon={getIconByServiceName(event.serviceName)} />
        <Message>{event.message}</Message>
        <Time>{moment(event.dateTime).from()}</Time>
      </Event>
    ))}
  </Wrapper>
))
