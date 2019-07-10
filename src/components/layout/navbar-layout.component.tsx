import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import screenfull from 'screenfull'
import noop from 'lodash/noop'
import endsWith from 'lodash/endsWith'

import HeaderLink from './header-link.component'
import ErrorContainer from '../../containers/error.container'
import Timer from '../timer.component'
import { User } from '../../models'
import { Wrapper, HeaderWrapper, Header, PageWrapper, PageContent, Flex, TenantSelect } from './navbar-layout.styles'
import { ThemeConsumer, TimerConsumer } from '../../contexts'

interface NavbarLayoutProps extends RouteComponentProps {
  user: User
  signOut: () => void
  background?: string
  children?: React.ReactChildren | JSX.Element
}

class NavbarLayout extends React.PureComponent<NavbarLayoutProps> {
  public state = {
    hasError: false,
    isFullscreen: false,
  }

  public componentDidMount() {
    if (screenfull) {
      screenfull.on('change', this.setFullScreen)
    }
  }

  public componentDidUpdate(prevProps: Readonly<NavbarLayoutProps>) {
    const { history: { location: { pathname } } } = this.props
    if (prevProps.history.location.pathname !== pathname) {
      this.setState({ hasError: false })
    }
  }

  public componentDidCatch() {
    this.setState({ hasError: true })
  }

  public componentWillUnmount() {
    if (screenfull) {
      screenfull.off('change', this.setFullScreen)
    }
  }

  public setFullScreen = () => this.setState({ isFullscreen: screenfull ? screenfull.isFullscreen : false })

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
    const { children, background, user } = this.props
    const { hasError, isFullscreen } = this.state
    const { pathname } = window.location

    return (
      <Wrapper>
        <HeaderWrapper background={background}>
          <Header>
            {user && <HeaderLink active={pathname === '/'} icon="home" to="/" />}
            {user && (
              <HeaderLink active={pathname.includes('/settings')} icon="cogs" to="/settings" />
            )}
            {user && <TenantSelect />}
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
            {user && endsWith(pathname, '/dashboard') && (
              <HeaderLink
                icon={isFullscreen ? 'compress' : 'expand'}
                onClick={() => (screenfull ? screenfull.toggle() : noop)}
              />
            )}
            <ThemeConsumer>
              {({ toggleTheme }) => (
                <HeaderLink icon="lightbulb" iconSize="1x" onClick={toggleTheme} />
              )}
            </ThemeConsumer>
            {user && <HeaderLink icon="sign-out-alt" onClick={this.logout} />}
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

export default withRouter(NavbarLayout)
