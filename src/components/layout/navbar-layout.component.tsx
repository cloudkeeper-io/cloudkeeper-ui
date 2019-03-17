import React from 'react'
import { History } from 'history'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import HeaderLink from './header-link.component'
import ErrorContainer from '../../containers/error.container'
import { User } from '../../models'
import { Wrapper, HeaderWrapper, Header, PageWrapper, PageContent, Flex } from './navbar-layout.styles'
import { ThemeConsumer } from '../../contexts'

interface NavbarLayoutProps extends RouteComponentProps{
  history: History
  user: User
  background?: string
  children?: React.ReactChildren | JSX.Element
}

class NavbarLayout extends React.PureComponent<NavbarLayoutProps> {
  public state = { hasError: false }

  public componentDidCatch() {
    this.setState({ hasError: true })
  }

  public isActive = (link: any) => {
    const { location: { pathname } } = window
    const { to } = link
    if (link.isActive) {
      return link.isActive(pathname)
    }
    return to && pathname.includes(to)
  }

  public logout = () => this.props.user.signOut()

  public render() {
    const { children, background, user: { session } } = this.props
    const { hasError } = this.state
    const { pathname } = window.location

    return (
      <Wrapper>
        <HeaderWrapper background={background}>
          <Header>
            {session && <HeaderLink active={pathname.includes('/')} icon="home" to="/" />}
            {session && <HeaderLink active={pathname.includes('/settings')} icon="cogs" to="/settings" />}
            <Flex />
            <ThemeConsumer>
              {({ dispatch }) => (
                <HeaderLink icon="lightbulb" iconSize="1x" onClick={() => dispatch({ type: 'toggle' })} />
              )}
            </ThemeConsumer>
            {session && <HeaderLink icon="sign-out-alt" onClick={this.logout} />}
          </Header>
        </HeaderWrapper>
        <PageWrapper>
          <PageContent>
            {hasError ? <ErrorContainer /> : children}
          </PageContent>
        </PageWrapper>
      </Wrapper>
    )
  }
}

export default withRouter(NavbarLayout) as any
