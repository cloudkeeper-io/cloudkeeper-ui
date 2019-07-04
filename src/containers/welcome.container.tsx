import React, { useState, memo } from 'react'
import styled from 'styled-components/macro'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import Card from '../components/card.component'
import { AccentText, Title, Text } from '../components/typography.component'
import CreateTenantModal from './settings/components/tenants/create-tenant-modal.component'
import Button from '../components/button/button.component'


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: calc(100vh - 100px);
  padding: 0 20px;
  align-items: center;
  justify-content: flex-start;
  @media(max-width: 800px) {
    padding: 0;
  }
`
const Content = styled(Card)`
  padding: 20px;
  width: 750px;
  max-width: calc(100vw - 40px);
`

const Section = styled.div`
  margin: 20px 0 ;
`

const AddButton = styled(Button)`
  margin: 15px auto 0 auto;
`

interface WelcomeContainerProps extends RouteComponentProps {
  className?: string
}

export default withRouter(memo(({ className }: WelcomeContainerProps) => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false)

  return (
    <Wrapper className={className}>
      <Content>
        <Title>Welcome to Cloudkeeper!</Title>
        <Section>
          <Text>
            You don&apos;t have any projects yet. To start using the cloudkeeper create your first project.
          </Text>
          <br />
          <Text>After that we&apos;ll guide you through a simple setup process which will take
            around <AccentText>2 minutes</AccentText> and will require <AccentText>no code changes.</AccentText>
          </Text>
        </Section>
        <AddButton onClick={() => setCreateModalOpen(true)}>Create Project</AddButton>
      </Content>
      <CreateTenantModal
        onClose={() => setCreateModalOpen(false)}
        isOpen={isCreateModalOpen}
      />
    </Wrapper>
  )
}))
