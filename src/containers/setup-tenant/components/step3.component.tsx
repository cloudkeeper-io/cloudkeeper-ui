import React, { useState, memo } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import styled from 'styled-components/macro'
import { Form } from 'react-final-form'
import { Mutation, MutationFn } from 'react-apollo'
import { map } from 'lodash'

import TextArea from '../../../components/form/text-area.components'
import Select from '../../../components/form/select.components'
import Error from '../../../components/form/error-message.components'
import Icon from '../../../components/icon.component'
import { Text, Code, CopyButton, ButtonWrapper, NavigationButton } from '../setup-tenant.styles'
import { tenantsQuery, createTenant } from '../../../graphql'

const mapRegions = (options: string[]): any => map(options, (x: string) => ({ value: x, label: x }))

const StyledForm = styled.form`
  margin-top: 20px;
`
const StyledSelect = styled(Select)`
  height: 100px;
  .react-select__menu-list {
    max-height: 120px;
  }
`
const ServerError = styled(Error)`
  position: absolute;
  top: 0;
  right: 0;
  transform: translateY(calc(-100% - 5px));
`

interface Values {
  keys: string
  region: string
}

interface StepsProps {
  code: string,
  onBack: () => void,
  regions: string[]
}

export default memo(({ code, onBack, regions }: StepsProps) => {
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')

  const onSubmit = async (v: Values, mutation: MutationFn) => {
    setLoading(false)
    setServerError('')
    try {
      const keys = JSON.parse(v.keys).AccessKey
      const parameters = {
        name: 'default tenant',
        region: v.region,
        accessKey: keys.AccessKeyId,
        secretKey: keys.SecretAccessKey,
      }

      await mutation({ variables: parameters })
    } catch (err) {
      setServerError('Server Error. Try Again Later')
    } finally {
      setLoading(false)
    }
  }

  const validate = (values: Values) => {
    const errors = {} as Values
    if (!values.keys) {
      errors.keys = 'Your Response is Required'
    }

    try {
      const keys = JSON.parse(values.keys).AccessKey

      if (!keys.AccessKeyId || !keys.SecretAccessKey) {
        errors.keys = 'Malformed string'
      }
    } catch (err) {
      errors.keys = 'Malformed string'
    }

    if (!values.region) {
      errors.region = 'Region is Required'
    }
    return errors
  }

  return (
    <>
      <Text>
        Our last step is to generate credentials for the user we created:
      </Text>
      <Code>
        {code}
        <CopyToClipboard text={code}>
          <CopyButton icon="copy" />
        </CopyToClipboard>
      </Code>
      <Mutation mutation={createTenant} refetchQueries={[{ query: tenantsQuery }]}>
        {mutation => (
          <Form onSubmit={v => onSubmit(v as Values, mutation)} validate={v => validate(v as Values)}>
            {({ handleSubmit }) => (
              <StyledForm onSubmit={handleSubmit}>
                <Text>
                  Paste the response here:
                </Text>
                <TextArea name="keys" placeholder="Your Result" />
                <Text>
                  Choose your region:
                </Text>
                <StyledSelect name="region" placeholder="AWS Region" options={mapRegions(regions)} />
                <ButtonWrapper>
                  <ServerError>{serverError}</ServerError>
                  <NavigationButton onClick={onBack} type="button">
                    <Icon icon="arrow-left" />
                  </NavigationButton>
                  <NavigationButton loading={loading}>
                    Finish
                  </NavigationButton>
                </ButtonWrapper>
              </StyledForm>
            )}
          </Form>
        )}
      </Mutation>
    </>
  )
})
