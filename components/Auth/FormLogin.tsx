import React from 'react'
import { useState } from 'react';
import { Login } from '../../utils/typeauth';
import { useRouter } from 'next/router';



const FormLogin = () => {
    const [loginData, setLoginData] = useState<Login>({
        'email' : '',
        'password' : ''
    })
    const base_Url = 'https://web-service.herokuapp.com'
    const router = useRouter()

    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({
            ...loginData,
            [e.target.name] : e.target.value
        })
    }

    const submitLogin = async(e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch(`${base_Url}/auth/login`, {
            method: "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({
                ...loginData
            })
        })
        if(!response.ok){
            throw new Error("Invalid Login")
        }
        const data = await response.json()
        localStorage.setItem('token', data.token)
        router.push('/')
    }

  return (
    <div>
        <form onSubmit={submitLogin} className="w-[24rem] mt-14">
        <div className="mb-4 space-y-2">
          <label htmlFor="#" className="font-semibold">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleChangeValue}
            placeholder="Enter email"
            className="bg-[#f5f5f5] p-4 outline-none w-full rounded-md"
          />
        </div>
        <div className="mb-4 space-y-2">
          <label htmlFor="#" className="font-semibold">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChangeValue}
            placeholder="Enter password"
            className="bg-[#f5f5f5] p-4 outline-none w-full rounded-md"
          />
        </div>
        <button className="bg-blue-500 p-4 text-center w-full uppercase font-semibold rounded-md shadow-md">
          Create Account
        </button>
      </form>
    </div>
  )
}

export default FormLogin