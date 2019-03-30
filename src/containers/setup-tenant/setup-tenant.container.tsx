import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { Query } from 'react-apollo'

import StepsIndicator from '../../components/steps-indicator.component'
import Step1 from './components/step1.component'
import Step2 from './components/step2.component'
import Step3 from './components/step3.component'
import { Wrapper, Content, StyledCard } from './setup-tenant.styles'
import { awsRegionsQuery } from '../../graphql'

const STEP1_CODE = 'aws iam create-user --user-name cloudkeeper-user'
const STEP2_CODE = `aws iam put-user-policy --user-name cloudkeeper-user --policy-name \
 cloudkeeper-user-policy --policy-document '{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Stmt1551136182426",
      "Action": [
        "cloudwatch:GetMetricData",
        "cloudwatch:GetMetricStatistics",
        "cloudwatch:ListMetrics",
        "lambda:ListFunctions",
        "dynamodb:ListTables",
        "dynamodb:DescribeTable"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}'
`
const STEP3_CODE = 'aws iam create-access-key --user-name cloudkeeper-user'

const Indicator = styled(StepsIndicator)`
  margin: 10px 0;
`

export default () => {
  const [step, setStep] = useState(1)

  return (
    <Wrapper>
      <Indicator steps={3} index={step - 1} onClick={i => setStep(i + 1)} />
      <StyledCard>
        <Query query={awsRegionsQuery}>
          {({ data: { awsRegions } }) => (
            <Content>
              {step === 1 && <Step1 code={STEP1_CODE} onForward={() => setStep(2)} />}
              {step === 2 && <Step2 code={STEP2_CODE} onBack={() => setStep(1)} onForward={() => setStep(3)} />}
              {step === 3 && <Step3 regions={awsRegions} code={STEP3_CODE} onBack={() => setStep(2)} />}
            </Content>
          )}
        </Query>
      </StyledCard>
    </Wrapper>
  )
}
