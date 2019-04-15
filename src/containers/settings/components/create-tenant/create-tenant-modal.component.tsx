import React from 'react'

import Modal from '../../../../components/modal.component'
import { Title } from '../../../../components/typography.component'
import CreateTenantForm from './create-tenant-form.component'

const ModalStyles = {
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
}


interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

export default ({ isOpen, onClose }: ModalProps) => (
  <Modal isOpen={isOpen} onRequestClose={onClose} style={ModalStyles}>
    <Title>Create Project</Title>
    <CreateTenantForm onClose={onClose} />
  </Modal>
)
