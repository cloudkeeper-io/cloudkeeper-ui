import React, { useContext } from 'react'
import { darken } from 'polished'
import styled from 'styled-components/macro'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import map from 'lodash/map'

import { Tenant } from '../models'
import CommonCard from '../components/card.component'
import Icon from '../components/icon.component'
import RadioButton from '../components/controls/radio.component'
import { Header as CommonHeader } from '../components/typography.component'
import { TenantContext } from '../contexts'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: calc(100% - 40px);
  min-height: calc(100vh - 100px);
  padding: 0 20px;
  align-items: center;
`
const Header = styled(CommonHeader)`
  margin-bottom: 20px;
`
const Card = styled(CommonCard)`
  width: 300px;
  //height: 200px;
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(100% - 70px);
  height: calc(100% - 65px);
  padding: 10px 30px 35px 40px;
`
const Row = styled.div`
  display: flex;
  justify-content: space-between;
`
const RemoveIcon = styled(Icon)`
  cursor: pointer;
  &:hover {
    color: ${p => darken(0.2, p.theme.colors.icon)};
  }
`

interface SettingsContainerProps extends RouteComponentProps {
  tenants: Tenant []
  className?: string
}

const Settings = ({ tenants, className }: SettingsContainerProps) => {
  const { tenant: currentTenant, setAndSaveTenant } = useContext(TenantContext)
  console.log(tenants)

  const onTenantClick = (tenant: Tenant) => {
    setAndSaveTenant(tenant)
  }

  return (
    <Wrapper className={className}>
      <Card>
        <Content>
          <Header>Your projects: </Header>
          {map(tenants, tenant => (
            <Row key={tenant.id}>
              <RadioButton
                label={tenant.name}
                checked={currentTenant.id === tenant.id}
                onClick={() => onTenantClick(tenant)}
              />
              <RemoveIcon icon="trash-alt" size="1x" />
            </Row>
          ))}
        </Content>
      </Card>
    </Wrapper>
  )
}

export default withRouter<SettingsContainerProps>(Settings)
