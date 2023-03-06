import { useRouter } from "next/router";
import { useState } from "react";
import { Register } from '../../utils/typeauth';

const FormRegister = () => {
    const [regisData, setRegisData] = useState<Register>({
        'names' : '',
        'phoneNumber' : '',
        'email' : '',
        'password' : ''
    })
    const base_Url = 'https://web-service.herokuapp.com'
    const router = useRouter()

    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegisData({
            ...regisData,
            [e.target.name] : e.target.value
        })
    }

    const submitRegister = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch(`${base_Url}/auth/register`,{
            method : "POST",
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({
                ...regisData
            })
        })
        if(!response.ok){
            throw new Error('Invalid Register')
        }
        // console.log(response)
        router.push('/auth/login')
    }

  return (
    <div>
      <form onSubmit={submitRegister} className="w-[24rem] mt-14">
        <div className="mb-4 space-y-2">
          <label htmlFor="#" className="font-semibold">
            Full Name
          </label>
          <input
            type="text"
            name="names"
            value={regisData.names}
            onChange={handleChangeValue}
            placeholder="Enter your name"
            className="bg-[#f5f5f5] p-4 outline-none w-full rounded-md"
          />
        </div>
        <div className="mb-4 space-y-2">
          <label htmlFor="#" className="font-semibold">
            Phone Number
          </label>
          <input
            type="text"
            name="phoneNumber"
            value={regisData.phoneNumber}
            onChange={handleChangeValue}
            placeholder="Enter phone number"
            className="bg-[#f5f5f5] p-4 outline-none w-full rounded-md"
          />
        </div>
        <div className="mb-4 space-y-2">
          <label htmlFor="#" className="font-semibold">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={regisData.email}
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
            value={regisData.password}
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
  );
};

export default FormRegister;
