import React, { ReactNode } from 'react'
import Navbar from '../components/Navbar'
import Providers from '../provide'

const Layout = ({children} : {children: ReactNode}) => {
  return (
    <Providers>
        <Navbar/>
        <main>{children}</main>
    </Providers>
  )
}

export default Layout