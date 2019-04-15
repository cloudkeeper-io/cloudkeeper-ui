import React, { useCallback, useContext, useState } from 'react'
import { darken } from 'polished'
import styled from 'styled-components/macro'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import map from 'lodash/map'
import get from 'lodash/get'

import { useQuery } from 'react-apollo-hooks'
import Button from '../../../components/button/button.component'
import RadioButton from '../../../components/controls/radio.component'
import RemoveModal from './remove-tenant-modal.component'
import CreateTenantModal from './create-tenant/create-tenant-modal.component'
import CommonCard from '../../../components/card.component'
import Loading from '../../../components/loading.component'
import { Tenant } from '../../../models'
import Icon from '../../../components/icon.component'
import { Header as CommonHeader } from '../../../components/typography.component'
import { TenantContext } from '../../../contexts'
import { tenantsQuery, removeTenant } from '../../../graphql'

const Header = styled(CommonHeader)`
  margin-bottom: 20px;
`
const Card = styled(CommonCard)`
  width: 300px;
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(100% - 70px);
  height: calc(100% - 65px);
  padding: 10px 30px 35px 40px;
`
const Overlay = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0,0,0, 0.4);
  z-index: 2;
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
const AddButton = styled(Button)`
  margin: 15px auto 0 auto;
  width: 75%;
`

interface TenantsCardProps extends RouteComponentProps {}

const Settings = ({ history }: TenantsCardProps) => {
  const { data, loading, error } = useQuery(tenantsQuery)
  const { tenant: currentTenant, setAndSaveTenant } = useContext(TenantContext)
  const [isRemoveModalOpen, setRemoveModalOpen] = useState(false)
  const [isCreateModalOpen, setCreateModalOpen] = useState(false)
  const [tenantToRemove, setTenantToRemove] = useState<Tenant>(null!)

  const onTenantClick = (tenant: Tenant) => {
    setAndSaveTenant(tenant)
  }

  const openRemoveModal = useCallback((tenant: Tenant) => {
    setTenantToRemove(tenant)
    setRemoveModalOpen(true)
  },
  [setRemoveModalOpen, setTenantToRemove])

  const closeRemoveModal = useCallback(() => setRemoveModalOpen(false),
    [setRemoveModalOpen])

  if (error) {
    throw error
  }

  const { tenants } = data

  return (
    <Mutation mutation={removeTenant} refetchQueries={[{ query: tenantsQuery }]}>
      {(mutation, { loading: removing }) => (
        <>
          <Card>
            {(removing || loading) ? (
              <Overlay>
                <Loading height="100%" />
              </Overlay>
            ) : <div />}
            <Content>
              <Header>Your projects: </Header>
              {map(tenants, tenant => (
                <Row key={tenant.id}>
                  <RadioButton
                    label={tenant.name}
                    checked={get(currentTenant, 'id') === tenant.id}
                    onChange={() => onTenantClick(tenant)}
                  />
                  <RemoveIcon icon="trash-alt" size="1x" onClick={() => openRemoveModal(tenant)} />
                </Row>
              ))}
              <AddButton onClick={() => setCreateModalOpen(true)}>Add Project</AddButton>
            </Content>
          </Card>
          <RemoveModal
            onRemove={(tenant) => {
              mutation({ variables: { id: tenant.id } })
              closeRemoveModal()
            }}
            onClose={closeRemoveModal}
            isOpen={isRemoveModalOpen}
            tenant={tenantToRemove!}
          />
          <CreateTenantModal
            onClose={() => {
              setCreateModalOpen(false)
            }}
            isOpen={isCreateModalOpen}
          />
        </>
      )}
    </Mutation>
  )
}

export default withRouter<TenantsCardProps>(Settings)
