import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/index';
import { useEffect } from 'react';
import { fetchProducts } from '../../slice/productSlice';
import MediaQuery from '../mediaQuery/MediaQuery';
import Image from 'next/image';
import {AiFillStar} from 'react-icons/ai'

const Product = () => {
    const isMobile = MediaQuery("(max-width: 600px)")
    const dispatch = useDispatch<AppDispatch>()
    const {products} = useSelector((state : RootState) => state.product)
    
    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

  return (
    <div className={` ${isMobile ? "grid-cols-2 gap-x-5" : "grid-cols-4 gap-x-5 mx-40"} grid justify-items-center gap-y-10`}>
      {
          products?.map((val : any) => (
              
              <div key={val.id}>
                  <div className={`${isMobile ? "w-[10rem] h-[15rem]" : "w-[15rem] h-[20rem]"} bg-gray-100  p-5 justify-center flex relative`}>
                      <Image src={val.images[0]} alt={val.title} width="250" height="100"/>
                      <div className='bg-white absolute top-0 right-0 p-2 flex items-center shadow-md space-x-2'>
                        <AiFillStar className='text-lg text-orange-400'/>
                        <p>{val.rating}</p>
                      </div>
                  </div>
                  <div className='mt-2'>
                    <h4 className='text-[16px] font-semibold'>{val.title}</h4>
                    <p className='text-gray-400'>$ {val.price}</p>
                  </div>
              </div>
          ))
      }
      </div>
  )
}

export default Product