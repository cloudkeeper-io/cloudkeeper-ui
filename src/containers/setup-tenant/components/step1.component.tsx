import React from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

import Icon from '../../../components/icon.component'
import { Text, Code, CopyButton, ButtonWrapper, NavigationButton, Flex } from '../setup-tenant.styles'

interface StepsProps {
  code: string,
  onForward: () => void,
}

export default ({ code, onForward }: StepsProps) => (
  <>
    <Text>
      In order for us to collect information we need a limited access to your AWS Account.
      Going through that process you will grant us access to only collect metrics.
    </Text>
    <Text>
      First, create a user by running a following AWS CLI command:
    </Text>
    <Code>
      {code}
      <CopyToClipboard text={code}>
        <CopyButton icon="copy" />
      </CopyToClipboard>
    </Code>
    <ButtonWrapper>
      <Flex />
      <NavigationButton onClick={onForward}>
        <Icon icon="arrow-right" />
      </NavigationButton>
    </ButtonWrapper>
  </>
)
