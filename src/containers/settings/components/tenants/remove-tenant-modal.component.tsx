import React from 'react'
import styled from 'styled-components/macro'
import { Dialog, DialogContent, DialogActions, Button } from '@material-ui/core'
import get from 'lodash/get'

import { Text, Title } from '../../../../components/typography.component'
import { Tenant } from '../../../../models'

const RemoveButton = styled(Button)`
  background: ${(p) => p.theme.palette.error.main};
  :hover {
    background: ${(p) => p.theme.palette.error.dark};
  }
`
const Name = styled.span`
  padding: 0 5px;
  font-weight: bold;
`

interface ModalProps {
  tenant: Tenant
  isOpen: boolean
  onClose: () => void
  onRemove: (tenant: Tenant) => void
}

export default ({ isOpen, onRemove, onClose, tenant }: ModalProps) => (
  <Dialog open={isOpen} onClose={onClose}>
    <DialogContent>
      <Title>Remove Project</Title>
      <Text>Your project <Name>{get(tenant, 'name')}</Name> will be removed. Are you sure about that?</Text>
    </DialogContent>
    <DialogActions>
      <Button color="default" onClick={onClose}>
        Cancel
      </Button>
      <RemoveButton color="primary" variant="contained" onClick={() => onRemove(tenant)}>
        Remove
      </RemoveButton>
    </DialogActions>
  </Dialog>
)
