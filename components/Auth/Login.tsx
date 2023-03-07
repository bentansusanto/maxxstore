import Image from "next/image";
import Link from "next/link";
import BgLogin from "../../public/assets/bg-auth.webp";
import FormLogin from "./FormLogin";
// import { useEffect, useState } from 'react';
import MediaQuery from "../mediaQuery/MediaQuery";


const Loginpage = () => {
  const isMobile = MediaQuery("(max-width: 600px)");

  return (
    <div>
      {
        isMobile ? 
        (<div className="mx-6">
          <div className="mt-20 space-y-2">
          <h1 className="text-3xl font-bold">Sign In</h1>
          <p className="text-gray-400"> Do you have account? <Link href={"/auth/register"} className="text-blue-500 font-semibold">Register Now</Link>
          </p>
          <FormLogin isMobile={isMobile}/>
        </div>
        </div>) : 
        (
        <div className="flex">
        <Image src={BgLogin} alt="" className="w-[45vw] h-screen" />
        {/* Form login */}
        <div className="mx-40 mt-32 space-y-2">
          <h1 className="text-3xl font-bold">Sign In</h1>
          <p className="text-gray-400"> Do you have account? <Link href={"/auth/register"} className="text-blue-500 font-semibold">Register Now</Link>
          </p>
          <FormLogin isMobile={isMobile}/>
        </div>
      </div>
        )
      }
    </div>
  );
};

export default Loginpage;
