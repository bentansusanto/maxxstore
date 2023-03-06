import React, { ReactNode } from 'react'
import Navbar from '../components/Navbar'

const Layout = ({children} : {children: ReactNode}) => {
  return (
    <div>
        <Navbar/>
        <main>{children}</main>
    </div>
  )
}

export default Layout