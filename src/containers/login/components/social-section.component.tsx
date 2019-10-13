import React, { useCallback, useContext, useState } from 'react'
import useReactRouter from 'use-react-router'
import { useMediaQuery } from '@material-ui/core'

import { SmallLoginButton, SocialButton, SocialWrapper } from '../login.styles'
import { UserContext } from '../../../contexts'
import { mobileMediaQuery } from '../../../utils'


export const SocialSection = () => {
  const { history } = useReactRouter()
  const { googleSignIn, githubSignIn, demoLogin } = useContext(UserContext)
  const [isDemoLoading, setDemoLoading] = useState(false)
  const isMobile = useMediaQuery(`(${mobileMediaQuery})`)

  const onDemoClick = useCallback(() => {
    setDemoLoading(true)
    demoLogin()
      .then(() => history.push('/'))
      // eslint-disable-next-line no-console
      .catch(console.log)
  }, [setDemoLoading, demoLogin, history])

  return (
    <SocialWrapper>
      <SocialButton icon={['fab', 'google']} onClick={googleSignIn} />
      <SocialButton icon={['fab', 'github']} onClick={githubSignIn} />
      {isMobile && (
        <SmallLoginButton type="button" onClick={onDemoClick} isLoading={isDemoLoading}>
          Demo
        </SmallLoginButton>
      )}
    </SocialWrapper>
  )
}
