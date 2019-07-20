import React, { useState, useEffect, memo } from 'react'
import useReactRouter from 'use-react-router'
import styled from 'styled-components/macro'
import { Form } from 'react-final-form'
import { Mutation, MutationFunction } from 'react-apollo'
import get from 'lodash/get'

import Error from '../../../../components/form/error-message.component'
import { tenantsQuery, createTenantMutation } from '../../../../graphql'
import { CreateTenant, CreateTenantVariables } from '../../../../graphql/mutations/types/CreateTenant'
import { trackEvent } from '../../../../utils/amplitude'
import { SmallField } from '../../../../components/form/field.component'
import Modal from '../../../../components/modal.component'
import Button from '../../../../components/button/button.component'
import { Title } from '../../../../components/typography.component'

const ModalStyles = {
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
}
const StyledForm = styled.form`
  margin-top: 20px;
`
const ServerError = styled(Error)`
  position: absolute;
  top: 0;
  right: 0;
  transform: translateY(calc(-100% - 5px));
`
const Text = styled.div`
  margin-bottom: 10px;
`
const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 35px;
  justify-content: flex-end;
`
const CancelButton = styled(Button)`
  max-width: calc(45% - 10px);
`
const CreateButton = styled(Button)`
  max-width: calc(45% - 10px);
  margin-left: 10px;
`

interface Values {
  name: string
}

interface StepsProps {
  onClose: () => void
  isOpen: boolean
}

export default memo(({ onClose, isOpen }: StepsProps) => {
  const { history } = useReactRouter()
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')

  useEffect(() => trackEvent('Opened Create Project'), [])

  const onSubmit = async (v: Values, mutation: MutationFunction<CreateTenant, CreateTenantVariables>) => {
    setLoading(true)
    setServerError('')
    try {
      const parameters = {
        name: v.name,
      }

      const response = await mutation({ variables: parameters })
      const tenantId = get(response, 'data.createTenant.id')
      trackEvent('Created Project')
      history.push(`/tenant/${tenantId}/dashboard`)
    } catch (err) {
      setLoading(false)
      setServerError('Server Error. Try Again Later')
    }
  }

  const validate = (values: Values) => {
    const errors = {} as Values

    if (!values.name) {
      errors.name = 'Project name is required'
    }

    return errors
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={ModalStyles}>
      <Title>Create Project</Title>
      <Mutation
        mutation={createTenantMutation}
        update={(cache: any, { data }: any) => {
          const { createTenant } = data!
          const { tenants } = cache.readQuery({ query: tenantsQuery }) as any
          cache.writeQuery({
            query: tenantsQuery,
            data: { tenants: tenants.concat([createTenant]) },
          })
        }}
      >
        {(mutation: any) => (
          <Form onSubmit={v => onSubmit(v as Values, mutation)} validate={v => validate(v as Values)}>
            {({ handleSubmit, pristine, invalid }) => (
              <StyledForm onSubmit={handleSubmit}>
                <Text>
                  Enter the name of the project:
                </Text>
                <SmallField name="name" placeholder="Your Project Name" />
                <ButtonWrapper>
                  <ServerError>{serverError}</ServerError>
                  <CancelButton background="#797070" color="#FFF" onClick={onClose} type="button">
                    Cancel
                  </CancelButton>
                  <CreateButton isLoading={loading} disabled={pristine || invalid}>
                    Create
                  </CreateButton>
                </ButtonWrapper>
              </StyledForm>
            )}
          </Form>
        )}
      </Mutation>
    </Modal>
  )
})
