import React, { memo } from 'react'
import styled from 'styled-components/macro'
import { Typography } from '@material-ui/core'
import moment from 'moment'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'

import { getIconByServiceName } from '../../utils'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
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
const Placeholder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex: 1;
`

interface EventsCardProps {
  events: any[],
}

export const EventsCard = memo(({ events }: EventsCardProps) => (
  <Wrapper>
    <Title variant="h5">Events</Title>
    {isEmpty(events) && (
      <Placeholder>
        <Typography variant="h6">
          No Data Available
        </Typography>
      </Placeholder>
    )}
    {map(events, (event, index) => (
      <Event key={index}>
        {getIconByServiceName(event.serviceName)}
        <Message>{event.message}</Message>
        <Time>{moment(event.dateTime).from()}</Time>
      </Event>
    ))}
  </Wrapper>
))
