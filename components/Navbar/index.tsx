import React, { useEffect, useState } from 'react'
import { User } from '../../utils/typeauth'
import Image from 'next/image'
import Logo from '../../public/logo-maxxstore.svg'
import { QuicLink } from '../../utils/typepage'
import Link from 'next/link'
import {FiSearch} from 'react-icons/fi'
import {BsCart2} from 'react-icons/bs'
import {BiUserCircle} from 'react-icons/bi'
import { useRouter } from 'next/router';


const links: QuicLink[] = [
  {page: 'Home', link: '/'},
  {page: 'Product', link: '/product'},
  {page: 'Service', link: '/service'},
  {page: 'Contact', link: '/contact'},
]

const Navbar = () => {
  const [data, setData] = useState<User>()
  const [isAuth, setIsAuth] = useState<boolean>(false) 
  const base_Url = 'https://web-service.herokuapp.com'
  const [active, setActive] = useState('home')
  const [dropProfile, setDropProfile] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() =>{
    const getUser = async() => {
      const token = localStorage.getItem('token')
      try {
        const response = await fetch(`${base_Url}/auth/profile`, {
          headers : {
            Authorization : `Bearer ${token}`
          }
        })
        if(!response.ok){
          throw new Error('Unauthorized')
        }
        const content = await response.json()
        setData(content)
        setIsAuth(content)
        // console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    getUser();
  }, [])

  const Logout = async() => {
    try {
      const response = await fetch(`${base_Url}/auth/logout`,{
        method : "POST",
        headers : {'Content-Type' : 'application/json'}
      })
      if(!response.ok){
        throw new Error('Unauthorized')
      }
      console.log(response)
      localStorage.removeItem('token')
      router.push('/auth/login')
    } catch (error) {
      throw error
    }
  } 

  return (
    <div>
      <div className='px-20 py-4 flex items-center'>
        <Image src={Logo} alt="logo-maxxstore" className='w-14'/>
        
        {/* Navlink */}
        <ul className='flex space-x-10 ml-auto'>
          {
            links.map((val, idx) => (
              <li key={idx}>
                <Link href={val.link}>{val.page}</Link>
              </li>
            ))
          }
        </ul>

        {/* Link Icon */}
        <div className='flex items-center space-x-10 ml-auto mr-10'>
          {/* Search */}
          <div>
            <FiSearch className='text-lg'/>
          </div>
          {/* Cart */}
          <div className='relative'>
            <BsCart2 className='text-lg'/>
            <span className='bg-red-500 rounded-full py-.5 px-1.5 absolute top-0 left-3 text-[.75rem]'>0</span>
          </div>
          {/* Auth */}
          {
            isAuth ? 
            (<div className='relative'>
              <div onClick={() => setDropProfile(!dropProfile)} className='flex items-center space-x-2 cursor-pointer'>
                <BiUserCircle className='text-xl'/>
                <p className='capitalize'>{data?.names}</p>
                <div className={`${dropProfile? "bg-gray-300 p-3 space-y-3 absolute top-8 w-24 rounded-sm" : "hidden"} `}>
                  <p onClick={Logout}>Logout</p>
                  <p>Settings</p>
                </div>
              </div>
            </div>) : 
            (<div>
              <ul className='flex space-x-5 items-center'>
                <li>
                  <Link href={'/auth/login'}>Login</Link>
                </li>
                <li>
                  <Link href={'/auth/register'}>Register</Link>
                </li>
              </ul>
            </div>)
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar