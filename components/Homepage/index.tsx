import React from 'react'
import HeroSection from './components/HeroSection'
import MediaQuery from '../mediaQuery/MediaQuery'

const Home = () => {
  const isMobile = MediaQuery("(max-width: 600px)")
  return (
    <div>
        <HeroSection isMobile={isMobile}/>
    </div>
  )
}

export default Home