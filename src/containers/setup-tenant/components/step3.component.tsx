import React from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import styled from 'styled-components/macro'
import { Form } from 'react-final-form'

import TextArea from '../../../components/form/text-area.components'
import Select from '../../../components/form/select.components'
import Error from '../../../components/form/error-message.components'
import Icon from '../../../components/icon.component'
import { Text, Code, CopyButton, ButtonWrapper, NavigationButton } from '../setup-tenant.styles'

const REGIONS = ['us-east-2', 'us-east-1', 'us-west-1', 'eu-west-1', 'eu-central-1'].map(x => ({ value: x, label: x }))

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
}

export default class extends React.PureComponent<StepsProps> {
  public state = {
    loading: false,
    serverError: '',
  }

  public onSubmit = (v: Values) => {
    console.log(v)
    this.setState({ loading: true, serverError: '' })
    setTimeout(() => {
      this.setState({ serverError: 'Server Error. Try Again Later', loading: false })
    }, 1000)
  }

  public validate = (values: Values) => {
    const errors = {} as Values
    if (!values.keys) {
      errors.keys = 'Your Response is Required'
    }
    if (!values.region) {
      errors.region = 'Region is Required'
    }
    return errors
  }

  public render() {
    const { code, onBack } = this.props
    const { loading, serverError } = this.state
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
        <Form onSubmit={v => this.onSubmit(v as Values)} validate={v => this.validate(v as Values)}>
          {({ handleSubmit }) => (
            <StyledForm onSubmit={handleSubmit}>
              <Text>
                Paste the response here:
              </Text>
              <TextArea name="keys" placeholder="Your Result" />
              <Text>
                Choose your region:
              </Text>
              <StyledSelect name="region" placeholder="AWS Region" options={REGIONS} />
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
      </>
    )
  }
}
