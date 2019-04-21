import styled from 'styled-components/macro'
import Card from '../card.component'
import { Header as CommonHeader, Text as CommonText } from '../typography.component'
import StepIndicator from '../steps-indicator.component'

export const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  min-width: 500px;
  height: 310px;
  margin: auto;
`
export const Content = styled.div`
  display: flex;
  width: calc(100% - 40px);
  height: calc(100% - 10px);
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 10px 20px 0 30px;
`
export const Header = styled(CommonHeader)`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 5px;
`
export const TabIndicator = styled(StepIndicator)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`
export const Text = styled(CommonText)`
  position: relative;
  margin-bottom: 8px;
  line-height: 19px;
`
export const InfoText = styled(Text)`
  display: flex;
  justify-content: space-between;
  :last-child {
    margin-bottom: 0;
  }
`
export const Value = styled.div`
  margin-left: 15px;
`
export const GraphContainer = styled.div`
  width: calc(100% - 30px);
  height: 130px;
  margin-left: -10px;
  svg {
    overflow: visible;
  }
`
export const Tab = styled.div`
  width: 100%;
  flex: 1;
`
