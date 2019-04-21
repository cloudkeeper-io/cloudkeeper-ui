import React, { useContext } from 'react'
import styled from 'styled-components/macro'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import map from 'lodash/map'

import CommonSelect from './controls/select.components'
import { TenantContext } from '../contexts'

const Select = styled(CommonSelect)`
  width: 200px;
  height: 50px;
  .react-select__control {
    border: none;
  }
`

interface TenantSelectProps extends RouteComponentProps {
  className?: string
}

export default withRouter(({ history, className }: TenantSelectProps) => {
  const { tenants, currentTenant } = useContext(TenantContext)

  const options = map(tenants, tenant => ({ label: tenant.name, value: tenant.id }))

  return (
    <Select
      className={className}
      options={options}
      value={{ label: currentTenant.name, value: currentTenant.id }}
      onChange={({ value }: any) => history.push(`/tenants/${value}/dashboard`)}
    />
  )
})
