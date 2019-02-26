import * as React from 'react'
import Head from 'next/head'

import BasicLayout from '../components/basic-layout'

function Home() {
  return (
    <>
      <Head>
        <title>CloudKeeper | Index </title>
      </Head>
      <BasicLayout>
        <div>Welcome to next.js!</div>
      </BasicLayout>
    </>
  )
}

export default Home
