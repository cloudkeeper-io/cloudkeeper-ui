import * as React from 'react'
import Loading from './loading.component'

interface LoadingProps {
  height?: any
  error?: any
  className?: any
}

export default class extends React.PureComponent<LoadingProps> {
  public componentDidMount() {
    window.scrollTo(0, 0)
  }

  public render() {
    return <Loading {...this.props} />
  }
}
