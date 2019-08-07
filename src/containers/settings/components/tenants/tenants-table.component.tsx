import React, { useCallback, useContext, useState, memo } from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import map from 'lodash/map'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Button from '../../../../components/button/button.component'
import RemoveModal from './remove-tenant-modal.component'
import Loading from '../../../../components/spinners/loading.component'
import { Tenant } from '../../../../models'
import { tenantsQuery, removeTenant } from '../../../../graphql'
import { TenantContext, UserContext } from '../../../../contexts'
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

const Head = styled(TableHead)`
  .MuiTableCell-head {
    font-size: ${p => p.theme.table.header.fontSize};
    font-weight: ${p => p.theme.table.header.fontWeight};
    color: ${p => p.theme.table.header.color};
  }
`
const DeleteButton = styled(Button)`
  width: 80px;
  height: 25px;
  font-size: 11px;
`

const Status = styled.span<{ active: boolean }>`
    ${p => (p.active ? p.theme.table.status.completed : p.theme.table.status.notCompleted)};
`

export default memo(() => {
  const { tenants, loading, error } = useContext(TenantContext)
  const { user } = useContext(UserContext)
  const [isRemoveModalOpen, setRemoveModalOpen] = useState(false)
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
    <Mutation mutation={removeTenant} refetchQueries={[{ query: tenantsQuery }]}>
      {(mutation: any, { loading: removing }: any) => (
        <>
          <Table>
            {(removing || loading) ? (
              <Overlay>
                <Loading height="100%" />
              </Overlay>
            ) : null}
            <Head>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created</TableCell>
                <TableCell />
              </TableRow>
            </Head>
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
            onRemove={(tenant) => {
              mutation({ variables: { id: tenant.id } })
              closeRemoveModal()
            }}
            onClose={closeRemoveModal}
            isOpen={isRemoveModalOpen}
            tenant={tenantToRemove!}
          />
        </>
      )}
    </Mutation>
  )
})
