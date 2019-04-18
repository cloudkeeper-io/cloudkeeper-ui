import React, { useState, useEffect, memo } from 'react'
import styled from 'styled-components/macro'
import { Form } from 'react-final-form'
import { Mutation, MutationFn } from 'react-apollo'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import get from 'lodash/get'

import Error from '../../../../components/form/error-message.components'
import { Text, ButtonWrapper, NavigationButton } from './create-tenant.styles'
import { tenantsQuery, createTenantMutation } from '../../../../graphql'
import { trackEvent } from '../../../../utils/amplitude'
import { SmallField } from '../../../../components/form/field.components'

const StyledForm = styled.form`
  margin-top: 20px;
`
const ServerError = styled(Error)`
  position: absolute;
  top: 0;
  right: 0;
  transform: translateY(calc(-100% - 5px));
`

interface Values {
  name: string
}

interface StepsProps extends RouteComponentProps {
  onClose: () => void
}

export default memo(withRouter(({ onClose, history }: StepsProps) => {
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')

  useEffect(() => trackEvent('Opened Create Project'), [])

  const onSubmit = async (v: Values, mutation: MutationFn) => {
    setLoading(true)
    setServerError('')
    try {
      const parameters = {
        name: v.name,
      }

      const response = await mutation({ variables: parameters })
      const tenantId = get(response, 'data.createTenant.id')
      trackEvent('Created Project')
      await history.push(`/tenant/${tenantId}/dashboard`)
    } catch (err) {
      setServerError('Server Error. Try Again Later')
    } finally {
      setLoading(false)
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
    <>
      <Mutation
        mutation={createTenantMutation}
        update={(cache, { data: { createTenant } }) => {
          const { tenants } = cache.readQuery<any>({ query: tenantsQuery })
          cache.writeQuery({
            query: tenantsQuery,
            data: { tenants: tenants.concat([createTenant]) },
          })
        }}
      >
        {mutation => (
          <Form onSubmit={v => onSubmit(v as Values, mutation)} validate={v => validate(v as Values)}>
            {({ handleSubmit, pristine, invalid }) => (
              <StyledForm onSubmit={handleSubmit}>
                <Text>
                  Enter the name of the project:
                </Text>
                <SmallField name="name" placeholder="Your Project Name" />
                <ButtonWrapper>
                  <ServerError>{serverError}</ServerError>
                  <NavigationButton onClick={onClose} type="button">
                    Cancel
                  </NavigationButton>
                  <NavigationButton loading={loading} disabled={pristine || invalid}>
                    Create
                  </NavigationButton>
                </ButtonWrapper>
              </StyledForm>
            )}
          </Form>
        )}
      </Mutation>
    </>
  )
}))
