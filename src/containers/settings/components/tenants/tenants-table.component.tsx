import React, { useCallback, useContext, useState, memo } from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'
import { useMutation } from 'react-apollo'
import map from 'lodash/map'
import get from 'lodash/get'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Button from '../../../../components/button/button.component'
import RemoveModal from './remove-tenant-modal.component'
import CreateTenantModal from './create-tenant-modal.component'
import Loading from '../../../../components/spinners/loading.component'
import { Tenant } from '../../../../models'
import { tenantsQuery, removeTenant } from '../../../../graphql'
import { TenantContext, UserContext } from '../../../../contexts'
import TableHeader from './table-header.component'
import { timestampToDate } from '../../../../utils/format.utils'

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0,0,0, 0.4);
  z-index: 2;
`

const TenantLink = styled(Link)`
  text-decoration: underline;
  color: ${p => p.theme.colors.text};
`

const DeleteButton = styled(Button)`
  width: 120px;
  height: 32px;
  font-size: 14px;
`
const AddButton = styled(Button)`
  margin: 15px auto 15px auto;
`

const Status = styled.span<{ active: boolean }>`
    ${p => (p.active ? p.theme.table.status.completed : p.theme.table.status.notCompleted)};
`

export default memo(() => {
  const { tenants, loading, error } = useContext(TenantContext)
  const { user } = useContext(UserContext)
  const [isRemoveModalOpen, setRemoveModalOpen] = useState(false)
  const [tenantToRemove, setTenantToRemove] = useState<Tenant>(null!)
  const [isCreateModalOpen, setCreateModalOpen] = useState(false)

  const openRemoveModal = useCallback((tenant: Tenant) => {
    setTenantToRemove(tenant)
    setRemoveModalOpen(true)
  },
  [setRemoveModalOpen, setTenantToRemove])

  const closeRemoveModal = useCallback(() => setRemoveModalOpen(false),
    [setRemoveModalOpen])
  const [mutation, { loading: removing }] = useMutation(removeTenant)

  const onRemove = async (tenant: Tenant) => {
    mutation({ variables: { id: tenant.id },
      update: (cache) => {
        const allTenants = get(cache.readQuery({ query: tenantsQuery }), 'tenants')
        const newTenants = allTenants.filter((t: Tenant) => t.id !== tenant.id)
        cache.writeQuery({ query: tenantsQuery, data: { tenants: newTenants } })
      } })
    closeRemoveModal()
  }

  if (error) {
    throw error
  }

  return (
    <>
      {(loading || removing) && (
      <Overlay>
        <Loading height="100%" />
      </Overlay>
      )}
      <AddButton onClick={() => setCreateModalOpen(true)}>Create Project</AddButton>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader label="Name" />
            <TableHeader label="Status" />
            <TableHeader label="Created" />
            <TableHeader />
          </TableRow>
        </TableHead>
        <TableBody>
          {map(tenants, tenant => (
            <TableRow key={tenant.id}>
              <TableCell component="th" scope="row">
                <TenantLink to={`/tenant/${tenant.id}`}>{tenant.name}</TenantLink>
              </TableCell>
              <TableCell>
                <Status active={tenant.isSetupCompleted}>
                  {tenant.isSetupCompleted ? 'ok' : 'not set up'}
                </Status>
              </TableCell>
              <TableCell>
                {timestampToDate(tenant.createdAt)}
              </TableCell>
              <TableCell align="right">
                {tenant.owner.id === user!.uid && (
                <DeleteButton onClick={() => openRemoveModal(tenant)}>DELETE</DeleteButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <RemoveModal
        onRemove={onRemove}
        onClose={closeRemoveModal}
        isOpen={isRemoveModalOpen}
        tenant={tenantToRemove!}
      />
      <CreateTenantModal
        onClose={() => setCreateModalOpen(false)}
        isOpen={isCreateModalOpen}
      />
    </>
  )
})
