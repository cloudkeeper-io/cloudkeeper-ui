import * as React from 'react'
import { History } from 'history'
import { withRouter } from 'react-router-dom'

import { MenuLink, HeaderLink, SidebarContent } from './components'
import ErrorContainer from '../../containers/error.container'
import { User } from '../../models'
import ThemeSwitcher from '../theme-switcher.component'
import {
  Wrapper,
  HeaderWrapper,
  Header,
  PageWrapper,
  PageContent,
  StyledSidebar,
  Flex,
} from './navbar-layout.styles'

interface NavbarLayoutProps {
  children?: React.ReactChildren | JSX.Element
  history: History
  user: User
}

export class NavbarLayout extends React.PureComponent<NavbarLayoutProps> {
  private readonly mql: MediaQueryList

  private mounted: boolean

  constructor(props: NavbarLayoutProps) {
    super(props)
    this.mounted = true
    this.mql = window.matchMedia('(min-width: 801px)')
    this.mql.addListener(this.handleMediaQueryChanged)
  }

  public state = { open: false, docked: window.innerWidth > 800, hasError: false }

  public componentDidMount() {
    const { history } = this.props
    this.handleMediaQueryChanged()
    history.listen(() => {
      if (this.mounted) {
        this.setState({ hasError: false })
      }
      if (window && window.scrollTo) {
        window.scrollTo(0, 0)
        if (this.mounted) {
          this.closeSidebar()
        }
      }
    })
  }

  public componentDidCatch(error: Error) {
    console.log(error)
    if (this.mounted) {
      this.setState({ hasError: true })
    }
  }

  public componentWillUnmount() {
    if (this.mql) {
      this.mql.removeListener(this.handleMediaQueryChanged)
      this.mounted = false
    }
  }

  public getLinks = () => {
    const links = [
      {
        title: 'Dashboard',
        to: '/dashboard',
      },
      {
        title: 'Settings',
        to: '/settings',
      },
      { title: 'Logout', onClick: this.logout },
    ]

    return links.map(link => (
      <MenuLink
        key={link.title}
        link={link}
        active={this.isActive(link)}
      />
    ))
  }

  public getHeaderLinks = () => {
    const { session } = this.props.user

    if (!session) {
      return null
    }

    const links = [
      {
        title: 'Dashboard',
        to: '/dashboard',
      },
      {
        title: 'Settings',
        to: '/settings',
      },
    ]

    return links.map(link => (
      <HeaderLink
        key={link.title}
        title={link.title}
        to={link.to}
        isActive={this.isActive(link)}
      />
    ))
  }

  public handleMediaQueryChanged = () => {
    if (this.mounted) {
      const { matches } = this.mql
      this.setState({ open: matches, docked: matches })
    }
  }

  public isActive = (link: any) => {
    const { location: { pathname } } = window
    const { to } = link
    if (link.isActive) {
      return link.isActive(pathname)
    }
    return to && pathname.includes(to)
  }

  public openSidebar = () => this.mounted && this.setState({ open: true })

  public closeSidebar = () => this.mounted && this.setState({ open: false })

  public logout = () => this.props.user.signOut()

  public render() {
    const { children, user: { session } } = this.props
    const { open, docked, hasError } = this.state

    return (
      <Wrapper>
        <StyledSidebar
          noOverlay={docked}
          width={250}
          isOpen={open && !docked}
          onStateChange={isOpen => this.mounted && this.setState({ open: isOpen })}
        >
          <SidebarContent>
            {this.getLinks()}
          </SidebarContent>
        </StyledSidebar>
        <HeaderWrapper>
          <Header>
            {docked && (
              <>
                <ThemeSwitcher />
                {this.getHeaderLinks()}
                <Flex />
                {session && <HeaderLink title="Logout" onClick={this.logout} />}
              </>
            )}
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

export default withRouter(NavbarLayout as any) as any
