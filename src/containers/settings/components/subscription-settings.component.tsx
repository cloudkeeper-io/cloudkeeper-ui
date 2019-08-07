import React, { useCallback, useContext } from 'react'
import styled from 'styled-components/macro'
import isEmpty from 'lodash/isEmpty'

import { UserSettingsContext, Settings } from '../../../contexts'
import Switch from '../../../components/controls/switch.component'
import Loading from '../../../components/spinners/loading.component'
import { Header as CommonHeader } from '../../../components/typography.component'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  overflow: hidden;
  padding: 20px;
  margin: 20px 0;
`
const Header = styled(CommonHeader)`
  margin-bottom: 20px;
`
const SwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

export default () => {
  const { settings, updateSettings } = useContext(UserSettingsContext)
  const { isSubscribedToEmails } = settings || {} as Settings

  const updateEmailSubscription = useCallback(() => (
    updateSettings({ isSubscribedToEmails: !isSubscribedToEmails })
  ), [updateSettings, isSubscribedToEmails])

  if (!settings || isEmpty(settings)) {
    return (
      <Wrapper>
        <Loading height="100%" />
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <Header>Email preferences</Header>
      <SwitchWrapper>
        <Switch checked={isSubscribedToEmails} onChange={updateEmailSubscription} />Updates and news
      </SwitchWrapper>
    </Wrapper>
  )
}
