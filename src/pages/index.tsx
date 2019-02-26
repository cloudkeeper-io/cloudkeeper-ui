import * as React from 'react'
import Head from 'next/head'

import BasicLayout from '../components/basic-layout'
import Card from '../components/main-card.component'

function Home() {
  return (
    <>
      <Head>
        <title>CloudKeeper | Index </title>
      </Head>
      <BasicLayout>
        <Card>
          Welcome to next.js!
        </Card>
      </BasicLayout>
    </>
  )
}

export default Home
