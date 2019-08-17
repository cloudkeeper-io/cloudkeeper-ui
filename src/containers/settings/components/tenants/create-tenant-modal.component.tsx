import React, { useEffect } from 'react'
import useReactRouter from 'use-react-router'
import styled from 'styled-components/macro'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core'
import { Form } from 'react-final-form'
import { useMutation } from 'react-apollo'
import get from 'lodash/get'

import { tenantsQuery, createTenantMutation } from '../../../../graphql'
import { CreateTenant } from '../../../../graphql/mutations/types/CreateTenant'
import { trackEvent } from '../../../../utils/amplitude'
import { SmallField } from '../../../../components/form/field.component'
import { LoadingButton } from '../../../../components/button/loading-button.component'

const ServerError = styled.div`
  color: ${p => p.theme.palette.error.main};
  font-size: 12px;
  margin-left: 5px;
`
const Text = styled.div`
  margin-bottom: 10px;
`
const Input = styled(SmallField)`
  width: 275px;
  height: auto;
`

interface Values {
  name: string
}

interface StepsProps {
  onClose: () => void
  isOpen: boolean
}

export default ({ onClose, isOpen }: StepsProps) => {
  const { history } = useReactRouter()
  const [createTenantFn, { loading, error }] = useMutation<CreateTenant>(createTenantMutation, {
    update: (cache: any, { data }: any) => {
      const { createTenant } = data!
      const { tenants } = cache.readQuery({ query: tenantsQuery }) as any
      cache.writeQuery({
        query: tenantsQuery,
        data: { tenants: [...tenants, createTenant] },
      })
    },
  })

  useEffect(() => trackEvent('Opened Create Project'), [])

  const onSubmit = async (v: Values) => {
    try {
      const parameters = {
        name: v.name,
      }

      const response = await createTenantFn({ variables: parameters })
      const tenantId = get(response, 'data.createTenant.id')
      trackEvent('Created Project')
      onClose()
      history.push(`/tenant/${tenantId}`)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
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
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Create Project</DialogTitle>
      <Form onSubmit={v => onSubmit(v as Values)} validate={v => validate(v as Values)}>
        {({ handleSubmit, pristine, invalid }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <Text>
                Enter the name of the project:
              </Text>
              <Input name="name" placeholder="Your Project Name" />
              <ServerError>
                {error && (get(error, 'graphQLErrors[0].message') || 'Server error')}
              </ServerError>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} type="button">
                Cancel
              </Button>
              <LoadingButton
                color="primary"
                variant="contained"
                disabled={pristine || invalid}
                loading={loading}
                type="submit"
              >
                Create
              </LoadingButton>
            </DialogActions>
          </form>
        )}
      </Form>
    </Dialog>
  )
}
