import React, { useEffect, useState } from 'react'
import { Mutation, MutationFn } from 'react-apollo'
import { Form } from 'react-final-form'
import styled from 'styled-components/macro'
import map from 'lodash/map'
import { DataProxy } from 'apollo-cache/lib/types'

import { trackEvent } from '../../../utils/amplitude'
import { setupTenantMutation } from '../../../graphql/mutations'
import { tenantsQuery } from '../../../graphql/queries'
import { SmallField } from '../../../components/form/field.components'
import { Tenant } from '../../../models'
import Error from '../../../components/form/error-message.components'
import Card from '../../../components/card.component'
import Button from '../../../components/button/button.component'
import { AccentText, Title, Text } from '../../../components/typography.component'
import { Tenants } from '../../../graphql/queries/types/Tenants'
import { SetupTenant, SetupTenantVariables } from '../../../graphql/mutations/types/SetupTenant'

const Wrapper = styled.div`
  display: flex;
  padding: 20px;
`
const Content = styled(Card)`
  padding: 20px;
  margin: auto;
  width: 750px;
`
const Section = styled.div`
  margin: 20px 0 ;
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
const ButtonWrapper = styled.div`
  display: flex;
  position: relative;
  margin-top: 35px;
  justify-content: space-between;
  width: 100%;
`

const getIntegrationUrl = (tenantId: string) => `https://console.aws.amazon.com/cloudformation/home?
region=us-east-1#/stacks/create/review?stackName=cloudkeeper-delegation&param_ExternalId=${tenantId}&
templateURL=https%3A%2F%2Fs3.eu-central-1.amazonaws.com%2Fcdn.cloudkeeper.io%2Fcloudformation.yml`

class SetupTenantMutation extends Mutation<SetupTenant, SetupTenantVariables> {}

interface Values {
  roleArn: string
}

interface SetupTenantProps {
  tenant: Tenant
}

export default (({ tenant }: SetupTenantProps) => {
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')

  useEffect(() => trackEvent('Opened Setup'), [])

  const onSubmit = async (v: Values, mutation: MutationFn<SetupTenant, SetupTenantVariables>) => {
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

  const update = (cache: DataProxy) => {
    const { tenants } = cache.readQuery<Tenants>({ query: tenantsQuery })!

    const newTenants = map(tenants, (newTenant) => {
      if (newTenant!.id === tenant.id) {
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
  }

  return (
    <Wrapper>
      <Content>
        <SetupTenantMutation mutation={setupTenantMutation} update={update}>
          {mutation => (
            <Form onSubmit={v => onSubmit(v as Values, mutation)} validate={v => validate(v as Values)}>
              {({ handleSubmit, pristine, invalid }) => (
                <form onSubmit={handleSubmit}>
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
                        then select the stack from CloudFormation list and go to
                        the <AccentText>Outputs</AccentText> tab
                        and copy the ARN value of <AccentText>CloudkeeperDelegationRoleArn</AccentText> to the box
                        below:
                      </ListItem>
                    </List>
                  </Section>
                  <Input name="roleArn" placeholder="arn:aws:iam::xxxxxxxxxxxx:role/CloudkeeperDelegationRole" />
                  <ButtonWrapper>
                    <ServerError>{serverError}</ServerError>
                    <Button loading={loading} disabled={pristine || invalid}>
                      Submit
                    </Button>
                  </ButtonWrapper>
                </form>
              )}
            </Form>
          )}
        </SetupTenantMutation>
      </Content>
    </Wrapper>
  )
})
