import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import get from 'lodash/get'

import HeaderLink from './header-link.component'
import ErrorContainer from '../../containers/error.container'
import Timer from '../timer.component'
import { User } from '../../models'
import { Wrapper, HeaderWrapper, Header, PageWrapper, PageContent, Flex, TenantName } from './navbar-layout.styles'
import { ThemeConsumer, TimerConsumer, TenantConsumer } from '../../contexts'

interface NavbarLayoutProps extends RouteComponentProps {
  user: User
  signOut: () => void
  background?: string
  children?: React.ReactChildren | JSX.Element
}

class NavbarLayout extends React.PureComponent<NavbarLayoutProps> {
  public state = { hasError: false }

  public componentDidUpdate(prevProps: Readonly<NavbarLayoutProps>) {
    const { history: { location: { pathname } }, user: { session } } = this.props
    if (prevProps.history.location.pathname !== pathname || session !== prevProps.user.session) {
      this.setState({ hasError: false })
    }
  }

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

  public logout = () => this.props.signOut()

  public render() {
    const { children, background, user: { session } } = this.props
    const { hasError } = this.state
    const { pathname } = window.location

    return (
      <Wrapper>
        <HeaderWrapper background={background}>
          <Header>
            {session && <HeaderLink active={pathname === '/'} icon="home" to="/" />}
            {session && (
              <TenantConsumer>
                {({ tenant }) => (
                  <HeaderLink active={pathname.includes('/settings')} icon="cogs" to="/settings">
                    <TenantName>{get(tenant, 'name')}</TenantName>
                  </HeaderLink>
                )}
              </TenantConsumer>
            )}
            <TimerConsumer>
              {({ count, delay, isActive, isVisible, setActiveAndSave }) => isVisible && (
                <>
                  <Timer
                    key={count}
                    time={delay}
                    size={40}
                    active={isActive}
                    onClick={() => setActiveAndSave(!isActive)}
                  />
                </>
              )}
            </TimerConsumer>
            <Flex />
            <ThemeConsumer>
              {({ toggleTheme }) => (
                <HeaderLink icon="lightbulb" iconSize="1x" onClick={toggleTheme} />
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

export default withRouter<NavbarLayoutProps>(NavbarLayout)
