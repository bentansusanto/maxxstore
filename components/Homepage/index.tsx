import React from 'react'
import HeroSection from './components/HeroSection'
import MediaQuery from '../mediaQuery/MediaQuery'
import ProductSection from './components/ProductSection'

const Home = () => {
  const isMobile = MediaQuery("(max-width: 600px)")
  return (
    <div>
        <HeroSection isMobile={isMobile}/>
        <ProductSection/>
    </div>
  )
}

export default Home