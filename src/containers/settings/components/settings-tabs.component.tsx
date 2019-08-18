import React, { useState } from 'react'
import styled from 'styled-components/macro'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { Users, Briefcase } from 'react-feather'
import UserSettings from './subscription-settings.component'
import TenantsTable from './tenants/tenants-table.component'
import SecuritySettings from './security-settings.component'

const Wrapper = styled.div`
  background: ${(p) => p.theme.card.background};
  border-radius: ${(p) => p.theme.card.borderRadius};
  box-shadow:  ${(p) => p.theme.card.shadow};
  overflow-x: auto;
`
const TabsHeader = styled(Tabs)`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  width: 100%;
  background-color: ${(p) => p.theme.tabs.backgroundColor};
  border-radius: ${(p) => p.theme.tabs.borderRadius};

  .Mui-selected {
    background-color: ${(p) => p.theme.tabs.selected.backgroundColor};
    color: ${(p) => p.theme.tabs.selected.color};
    font-weight: bold;
  }
  .MuiTabs-indicator {
    display: none;
  }
  .MuiTab-root {
    max-width: 100%;
  }
  .MuiTab-wrapper {
    display: flex;
    flex-direction: row;
  }
  svg {
    margin-right: 20px;
  }
`
const SettingsTab = styled(Tab)`
  flex: 1;
  border-radius: ${(p) => p.theme.tabs.borderRadius};
  .MuiTab-root {
    max-width: none;
  }
`

const TabContainer = styled.div`
  padding: 16px;
  overflow-x: hidden;
`

export default function SettingsTabs() {
  const [value, setValue] = useState(0)

  function handleChange(event: React.ChangeEvent<{}>, newValue: number) {
    setValue(newValue)
  }

  return (
    <Wrapper>
      <TabsHeader value={value} onChange={handleChange}>
        <SettingsTab label="Projects" icon={<Briefcase />} />
        <SettingsTab label="Account" icon={<Users />} />
      </TabsHeader>
      {value === 0 && <TabContainer><TenantsTable /></TabContainer>}
      {value === 1 && <TabContainer><SecuritySettings /><UserSettings /></TabContainer>}
    </Wrapper>
  )
}
