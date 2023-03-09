import React from 'react'
import Image from 'next/image'
import styles from '../../../styles/Home.module.css'
import MediaQuery from '../../mediaQuery/MediaQuery'

const HeroSection = () => {
    const isMobile = MediaQuery("(max-width: 600px)")
  return (
    <div>
        <div className={styles.hero}>
            <div>
                
            </div>
        </div>
    </div>
  )
}

export default HeroSection