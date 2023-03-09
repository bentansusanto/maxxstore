import React,{useState} from 'react'
import {BiUserCircle} from 'react-icons/bi'
import Link from 'next/link';
import { User } from '../../utils/typeauth';

interface NavProps{
    isAuth : boolean;
    data : User;
    Logout : any;
}

const NavIsAuth : React.FC<NavProps> = ({isAuth, data, Logout}) => {
    const [dropProfile, setDropProfile] = useState<boolean>(false)
  return (
    <div>
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
  )
}

export default NavIsAuth