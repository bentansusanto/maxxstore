import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {BsCheckSquareFill} from 'react-icons/bs'
import { fetchProducts } from '../../../slice/productSlice';
import { AppDispatch, RootState } from '../../../store/index';
import {AiFillStar} from 'react-icons/ai'

const ProductSection = () => {
  const {products} = useSelector((state : RootState) => state.product)
  const dispatch = useDispatch<AppDispatch>()
  const [Check, setCheck] = useState<boolean>(false)

  const handleFilterCategory = () => {
    setCheck(!Check)
  }

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  return (
    <div className='flex space-x-10 mx-20 justify-center mt-20'>
      <div className='bg-gray-100 p-5 w-[15rem] h-[20rem]'>
        <div>
         <h4 className='font-semibold'>Category</h4>
          <div onClick={handleFilterCategory} className="mt-5 flex items-center space-x-2">
            {
              Check ? (<div className='border border-black w-[1.1rem] rounded-sm h-[1.1rem]'></div>) : (<BsCheckSquareFill className='text-lg'/>)
            }
            <p>Men fashion</p>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-4 gap-x-5 justify-items-center mx-40 gap-y-10'>
      {
          products?.map((val : any) => (
              
              <div key={val.id}>
                  <div className='bg-gray-100 w-[15rem] h-[20rem] p-5 justify-center flex relative'>
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
    </div>
  )
};

export default ProductSection;
