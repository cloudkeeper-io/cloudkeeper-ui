import React, { useCallback, useContext, useState } from 'react'
import { darken } from 'polished'
import styled from 'styled-components/macro'
import { RouteComponentProps, withRouter, Link } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import map from 'lodash/map'

import Button from '../../../../components/button/button.component'
import RemoveModal from './remove-tenant-modal.component'
import CreateTenantModal from './create-tenant-modal.component'
import CommonCard from '../../../../components/card.component'
import Loading from '../../../../components/loading.component'
import { Tenant } from '../../../../models'
import Icon from '../../../../components/icon.component'
import { Header as CommonHeader } from '../../../../components/typography.component'
import { tenantsQuery, removeTenant } from '../../../../graphql'
import { RemoveTenant, RemoveTenantVariables } from '../../../../graphql/mutations/types/RemoveTenant'
import { TenantContext } from '../../../../contexts'

const Header = styled(CommonHeader)`
  margin-bottom: 20px;
`
const Card = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  overflow: hidden;
  padding: 20px;
`
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0,0,0, 0.4);
  z-index: 2;
`
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`
const TenantLink = styled(Link)`
  text-decoration: underline;
  color: ${p => p.theme.colors.text};
`
const RemoveIcon = styled(Icon)`
  cursor: pointer;
  &:hover {
    color: ${p => darken(0.2, p.theme.colors.icon)};
  }
`
const AddButton = styled(Button)`
  margin: 15px auto 0 auto;
`

class RemoveTenantMutation extends Mutation<RemoveTenant, RemoveTenantVariables> {}

interface TenantsCardProps extends RouteComponentProps {}

const Settings = () => {
  const { tenants, loading, error } = useContext(TenantContext)
  const [isRemoveModalOpen, setRemoveModalOpen] = useState(false)
  const [isCreateModalOpen, setCreateModalOpen] = useState(false)
  const [tenantToRemove, setTenantToRemove] = useState<Tenant>(null!)

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

  return (
    <RemoveTenantMutation mutation={removeTenant} refetchQueries={[{ query: tenantsQuery }]}>
      {(mutation, { loading: removing }) => (
        <>
          <Card>
            {(removing || loading) ? (
              <Overlay>
                <Loading height="100%" />
              </Overlay>
            ) : <div />}
            <Header>Your projects: </Header>
            {map(tenants, tenant => (
              <Row key={tenant.id}>
                <TenantLink to={`/tenants/${tenant.id}/dashboard`}>{tenant.name}</TenantLink>
                <RemoveIcon icon="trash-alt" size="1x" onClick={() => openRemoveModal(tenant)} />
              </Row>
            ))}
            <AddButton onClick={() => setCreateModalOpen(true)}>Create Project</AddButton>
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
            onClose={() => setCreateModalOpen(false)}
            isOpen={isCreateModalOpen}
          />
        </>
      )}
    </RemoveTenantMutation>
  )
}

export default withRouter<TenantsCardProps>(Settings)
