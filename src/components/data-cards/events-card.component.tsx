import React, { memo } from 'react'
import styled from 'styled-components/macro'
import { Typography } from '@material-ui/core'
import moment from 'moment'
import map from 'lodash-es/map'
import isEmpty from 'lodash-es/isEmpty'

import { getIconByServiceName } from '../../utils'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 25px 30px;
`
const Title = styled(Typography)`
  margin: 0 0 15px 0;
`
const Event = styled.div`
  display: flex;
  padding: 5px 0;
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
