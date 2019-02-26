import * as React from 'react'
import styled from 'styled-components'
import BasicLayout from '../components/basic-layout'

const ErrorCode = styled.div`
  font-size: 64px;
  font-weight: 300;
`
const Text = styled.div`
  font-size: 24px;
`

interface IError {
  statusCode: string;
  errorText: string;
}

export default class Error extends React.Component<IError> {
  public static getInitialProps({ res, err }: any) {
    const statusCode = (res && res.statusCode) || (err && err.statusCode) || 'Error'
    const errorText = String(statusCode) === '404' ? 'Page Not Found 😿' : 'Something goes wrong 😿'

    return { statusCode, errorText }
  }

  public render() {
    const { statusCode, errorText } = this.props
    return (
      <BasicLayout>
        <ErrorCode>{statusCode}</ErrorCode>
        <Text>{errorText}</Text>
      </BasicLayout>
    )
  }
}
