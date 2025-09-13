import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

type Props = {}

const HomeTemplate = (props: Props) => {
  return (
    <>
        <Header />

        <Outlet></Outlet>
    
        <Footer />
    
    </>
  )
}

export default HomeTemplate





