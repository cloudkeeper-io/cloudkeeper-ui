/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { text, number } from '@storybook/addon-knobs'

import StepIndicator from '../components/steps-indicator.component'
import HeaderTabs, { TabContent } from '../components/header-tabs.component'


const Wrapper = styled.div`
  width: 400px;
`

const Indicator = () => {
  const [tab, setTab] = useState(0)
  return (
    <Wrapper>
      <StepIndicator index={tab} steps={number('Tabs', 5)} onClick={i => setTab(i)} />
      <div>tab {tab} selected</div>
    </Wrapper>
  )
}

const HeaderTab = () => {
  const [tab, setTab] = useState(0)
  return (
    <Wrapper>
      <HeaderTabs
        tabs={[text('Tab 1 header', 'Last 24h'), text('Tab 2 header', 'Last 30 days')]}
        selectedIndex={tab}
        onChange={i => setTab(i)}
      />
      {tab ? (<TabContent key={tab}>{text('Tab 1 content', 'Tab 1 content')}</TabContent>) :
        (<TabContent key={tab}>{text('Tab 2 content', 'Tab 2 content')}</TabContent>)
      }
    </Wrapper>
  )
}

storiesOf('Tabs and Indicators', module)
  .add('Indicator', () => <Indicator />)
  .add('Header Tab', () => <HeaderTab />)
