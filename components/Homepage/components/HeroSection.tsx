import React from 'react'
import styles from '../../../styles/Home.module.css'


const HeroSection = ({isMobile} : {isMobile:boolean}) => {
    
  return (
    <div>
        <div className={styles.hero}>
            <div className={` ${isMobile ? "pt-32 p-6" : "pt-52 pl-10"} space-y-5`}>
                <h1 className={`${isMobile ? "text-4xl w-[95%]" : "text-5xl w-[45%]"} capitalize `}>Picked Every Item With Care, <span className='font-bold'>You must try.</span></h1>
            </div>
        </div>
    </div>
  )
}

export default HeroSection