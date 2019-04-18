import React, { useEffect, useState } from 'react'
import { Mutation, MutationFn } from 'react-apollo'
import { Form } from 'react-final-form'
import styled from 'styled-components'
import map from 'lodash/map'

import { trackEvent } from '../../../../utils/amplitude'
import { setupTenantMutation } from '../../../../graphql/mutations'
import { tenantsQuery } from '../../../../graphql/queries'
import { ButtonWrapper, NavigationButton } from '../create-tenant/create-tenant.styles'
import { SmallField } from '../../../../components/form/field.components'
import { Tenant } from '../../../../models'
import Error from '../../../../components/form/error-message.components'
import { AccentText, Title, Text } from '../../../../components/typography.component'

interface Values {
  roleArn: string
}

interface SetupTenantProps {
  tenant: Tenant
}

const Section = styled.div`
  margin: 20px 0 ;
`

export const StyledForm = styled.form`
  width: 100%;
  max-width: 700px;
  min-height: 300px;
  clip-path: ${p => p.theme.clipPath};
  padding: 0 40px;
`

const ServerError = styled(Error)`
  position: absolute;
  top: 0;
  right: 0;
  transform: translateY(calc(-100% - 5px));
`
const Link = styled.a`
  text-decoration: underline;
`
const Input = styled(SmallField)`
  max-width: 400px;
`
const List = styled.ol`
    display: block;
    list-style-type: decimal;
    margin-left: 0;
    margin-right: 0;
    padding-left: 0;
    list-style-position: inside;
`
const ListItem = styled.li`
  margin: 10px 0;
  font-size: 14px;
  line-height: 21px;
`

const getIntegrationUrl = (tenantId: string) => `https://console.aws.amazon.com/cloudformation/home?
region=us-east-1#/stacks/create/review?stackName=cloudkeeper-delegation&param_ExternalId=${tenantId}&
templateURL=https%3A%2F%2Fs3.eu-central-1.amazonaws.com%2Fcdn.cloudkeeper.io%2Fcloudformation.yml`

export default (({ tenant }: SetupTenantProps) => {
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')

  useEffect(() => trackEvent('Opened Setup'), [])

  const onSubmit = async (v: Values, mutation: MutationFn) => {
    setLoading(true)
    setServerError('')
    try {
      const parameters = {
        roleArn: v.roleArn,
        tenantId: tenant.id,
      }

      await mutation({ variables: parameters })
      trackEvent('Setup Tenant')
    } catch (err) {
      setServerError('Server Error. Try Again Later')
    } finally {
      setLoading(false)
    }
  }

  const validate = (values: Values) => {
    const errors = {} as Values

    if (!values.roleArn) {
      errors.roleArn = 'Role ARN is required'
    }

    return errors
  }

  return (
    <>
      <Mutation
        mutation={setupTenantMutation}
        update={(cache) => {
          const { tenants } = cache.readQuery<any>({ query: tenantsQuery })

          const newTenants = map(tenants, (newTenant) => {
            if (newTenant.id === tenant.id) {
              return {
                ...newTenant,
                isSetupCompleted: true,
              }
            }

            return newTenant
          })

          cache.writeQuery({
            query: tenantsQuery,
            data: { tenants: newTenants },
          })
        }}
      >
        {mutation => (
          <Form onSubmit={v => onSubmit(v as Values, mutation)} validate={v => validate(v as Values)}>
            {({ handleSubmit, pristine, invalid }) => (
              <StyledForm onSubmit={handleSubmit}>
                <Title>Now install cloudkeeper to your AWS account</Title>
                <Section>
                  <Text>
                    <AccentText>
                      Cloudkeeper requires no code changes.
                    </AccentText>
                    <br />
                    Instead, you&apos;ll need to connect cloudkeeper to your AWS
                    account through a preconfigured CloudFormation stack.
                    <br />
                  It usually takes <AccentText>less than 2 minutes.</AccentText>
                  </Text>
                </Section>
                <Section>
                  <List>
                    <ListItem>
                      Click here to&nbsp;
                      <Link
                        target="_blank"
                        href={getIntegrationUrl(tenant.id)}
                      >
                        add cloudkeeper CloudFormation stack to AWS
                      </Link>
                    </ListItem>
                    <ListItem>
                    Check <AccentText>I Acknowledge that AWS CloudFormation might create IAM resources</AccentText>
                    </ListItem>
                    <ListItem>
                    Click <AccentText>Create</AccentText>
                    </ListItem>
                    <ListItem>
                    Wait a minute entil the stack creation completes,
                    then select the stack from CloudFormation list and go to the <AccentText>Outputs</AccentText> tab
                    and copy the ARN value of <AccentText>CloudkeeperDelegationRoleArn</AccentText> to the box below:
                    </ListItem>
                  </List>
                </Section>
                <Input name="roleArn" placeholder="arn:aws:iam::xxxxxxxxxxxx:role/CloudkeeperDelegationRole" />
                <ButtonWrapper>
                  <ServerError>{serverError}</ServerError>
                  <NavigationButton loading={loading} disabled={pristine || invalid}>
                    Submit
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
