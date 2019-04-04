import React, { useEffect } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

import Icon from '../../../components/icon.component'
import { Text, Code, CopyButton, ButtonWrapper, NavigationButton, FormattedCode } from '../setup-tenant.styles'
import { trackEvent } from '../../../utils/amplitude'

interface StepsProps {
  code: string,
  onBack: () => void,
  onForward: () => void,
}

export default ({ code, onBack, onForward }: StepsProps) => {
  useEffect(() => trackEvent('Setup Step 2'), [])

  return (
    <>
      <Text>
        Now, give a user access to the metrics by running this aws cli command:
      </Text>
      <Code>
        <FormattedCode>
          {code}
        </FormattedCode>
        <CopyToClipboard text={code}>
          <CopyButton icon="copy" />
        </CopyToClipboard>
      </Code>
      <ButtonWrapper>
        <NavigationButton onClick={onBack}>
          <Icon icon="arrow-left" />
        </NavigationButton>
        <NavigationButton onClick={onForward}>
          <Icon icon="arrow-right" />
        </NavigationButton>
      </ButtonWrapper>
    </>
  )
}
