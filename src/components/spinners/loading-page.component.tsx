import React, { memo, useEffect } from 'react'
import Loading from './loading.component'

interface LoadingProps {
  height?: any
  error?: any
  className?: any
}

export default memo((props: LoadingProps) => {
  useEffect(() => window.scrollTo(0, 0), [])

  return <Loading height="calc(100vh - 60px)" {...props} />
})
