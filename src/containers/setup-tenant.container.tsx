import * as React from 'react'
import styled from 'styled-components/macro'
import CopyToClipboard from 'react-copy-to-clipboard'

import Icon from '../components/icon.component'
import Card from '../components/card.component'
import Button from '../components/button.component'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  align-items: center;
  height: 100%;
  min-height: 100vh;
  margin-top: -60px;
  padding: 0 20px;
  background-size: contain;
`
const StyledCard = styled(Card)`
  width: 450px;
  min-height: 300px;
  ${Card.Content} {

  }
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(100% - 70px);
  height: calc(100% - 60px);
  padding: 35px 30px 15px 40px;
  font-size: 12px;
  line-height: 18px;
`
const Text = styled.div`
`
const Code = styled.div`
  position: relative;
  width: calc(100% - 40px);
  margin-top: 20px;
  padding: 20px;
  background: rgba(0,0,0, 0.15);
  text-align: center;
`
const CopyIcon = styled(Icon)`
  position: absolute;
  bottom: -10px;
  right: 20px;
  cursor: pointer;
`
const ButtonWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: flex-end;
  width: 100%;
`

export default () => (
  <Wrapper>
    <StyledCard>
      <Content>
        <Text>
          In order for us to collect information we need a limited access to your AWS Account.
          Going through that process you will grant us access to only collect metrics.
          First, create a user by running a following AWS CLI command:
        </Text>
        <Code>
          aws iam create-user --user-name cloudkeeper-user
          <CopyToClipboard text="aws iam create-user --user-name cloudkeeper-user">
            <CopyIcon size="2x" icon="copy" />
          </CopyToClipboard>
        </Code>
        <ButtonWrapper>
          <Button>
            Continue
          </Button>
        </ButtonWrapper>
      </Content>
    </StyledCard>
  </Wrapper>
)
