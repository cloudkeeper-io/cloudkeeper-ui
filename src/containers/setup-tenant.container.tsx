import * as React from 'react'
import styled from 'styled-components/macro'
import CopyToClipboard from 'react-copy-to-clipboard'
import { transparentize } from 'polished'

import IconButton from '../components/button/icon-button.component'
import Icon from '../components/icon.component'
import Card from '../components/card.component'
import Button from '../components/button/button.component'

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
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(100% - 70px);
  height: calc(100% - 65px);
  padding: 35px 30px 20px 40px;
  font-size: 12px;
  line-height: 18px;
`
const Text = styled.div`
  margin-bottom: 10px;
`
const Code = styled.div`
  position: relative;
  width: calc(100% - 40px);
  padding: 20px;
  margin-top: 10px;
  background: ${p => transparentize(0.9, p.theme.colors.primary)};
  border: 2px solid ${p => p.theme.colors.primary};
  text-align: center;
  box-shadow: 0 0 4px ${p => p.theme.card.shadow};
`
const CopyButton = styled(IconButton)`
  position: absolute;
  bottom: -20px;
  right: -15px;
`
const ButtonWrapper = styled.div`
  margin-top: 35px;
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
        </Text>
        <Text>
          First, create a user by running a following AWS CLI command:
        </Text>
        <Code>
          aws iam create-user --user-name cloudkeeper-user
          <CopyToClipboard text="aws iam create-user --user-name cloudkeeper-user">
            <CopyButton icon="copy" />
          </CopyToClipboard>
        </Code>
        <ButtonWrapper>
          <Button width="150px" height="40px">
            <Icon icon="arrow-right" />
          </Button>
        </ButtonWrapper>
      </Content>
    </StyledCard>
  </Wrapper>
)
