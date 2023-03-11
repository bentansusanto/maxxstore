import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { BsCheckSquareFill } from 'react-icons/bs'
import { fetchCategories } from '../../../slice/productSlice';
import { AppDispatch, RootState } from '../../../store/index';
import MediaQuery from '../../mediaQuery/MediaQuery';
import Product from '../../Product';
import {BsChevronDown} from 'react-icons/bs'

const ProductSection = () => {
  const {categories} = useSelector((state : RootState) => state.product)
  const dispatch = useDispatch<AppDispatch>()
  const [Check, setCheck] = useState<boolean>(false)
  const isMobile = MediaQuery("(max-width: 600px)");

  const handleFilterCategory = () => {
    setCheck(!Check)
  }

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  return (
    <div>
      {
        isMobile ? 
        // Mobile Device
        (<div className='mx-5 my-20 space-y-10'>
          {/* Categories and Sorting */}
          <div>
            <div className='flex space-x-5 items-center'>
            <div>
              <input type="text" placeholder='Search Category...' className='bg-gray-100 w-[12rem] py-3 px-2 outline-none'/>
            </div>
            <div className='bg-gray-100 px-5 py-3 flex items-center space-x-4'>
              <p>Sort by</p>
              <BsChevronDown/>
            </div>
            </div>
            <div className='hidden'>
              {
                categories?.map((val:string) => (
                  <div key={val}>
                    <p>{val}</p>
                  </div>
                ))
              }
            </div>
          </div>
          <Product/>
        </div>) : 
        // Desktop
        (<div className="mx-20 flex space-x-10 justify-center mt-20 mb-40">
        <div className="bg-gray-100 p-5 w-[16rem] h-[42rem]">
          {/* Category */}
          <div>
           <h4 className='font-semibold'>Category</h4>
            <div onClick={handleFilterCategory} className="mt-5 space-y-2">
              {
                categories?.map((val : string) => (
                  <div key={val} className="flex items-center space-x-2 cursor-pointer">
                    {
                       Check ? (<BsCheckSquareFill className='text-lg'/>) : (<div className='border border-black w-[1.1rem] rounded-sm h-[1.1rem]'></div>)
                    }
                      <p>{val}</p>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <Product/>
      </div>)
      }
    </div>
    
  )
};

export default ProductSection;
