import React from 'react'

import { Icon } from '../components/icons'
import FaIcon from '../components/icons/fa-icon.component'

export const getIconByServiceName = (serviceName: string) => {
  switch (serviceName) {
    case 'AWS Lambda':
      return <Icon icon="lambda" />
    case 'DynamoDB':
      return <Icon icon="dynamo" />
    default:
      return <FaIcon icon="wallet" />
  }
}
