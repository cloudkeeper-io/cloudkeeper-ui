import React from 'react'
import styled from 'styled-components/macro'
import get from 'lodash/get'

import Modal from '../../../../components/modal.component'
import Button from '../../../../components/button/button.component'
import { Text, Title } from '../../../../components/typography.component'
import { Tenant } from '../../../../models'


const CancelButton = styled(Button)`
  max-width: calc(45% - 10px);
`
const RemoveButton = styled(Button)`
  max-width: calc(45% - 10px);
  margin-left: 10px;
`
const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`
const Name = styled.span`
  padding: 0 5px;
  font-weight: bold;
`
const ModalStyles = {
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
}


interface ModalProps {
  tenant: Tenant
  isOpen: boolean
  onClose: () => void
  onRemove: (tenant: Tenant) => void
}

export default ({ isOpen, onRemove, onClose, tenant }: ModalProps) => (
  <Modal isOpen={isOpen} onRequestClose={onClose} style={ModalStyles}>
    <Title>Remove Tenant</Title>
    <Text>Your tenant <Name>{get(tenant, 'name')}</Name> will be removed. Are you sure about that?</Text>
    <ButtonsWrapper>
      <CancelButton background="#797070" color="#FFF" onClick={onClose}>
        Cancel
      </CancelButton>
      <RemoveButton background="#de4141" color="#FFF" onClick={() => onRemove(tenant)}>
        Remove
      </RemoveButton>
    </ButtonsWrapper>
  </Modal>
)
