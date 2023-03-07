import Image from "next/image";
import Link from "next/link";
import BgLogin from "../../public/assets/bg-auth.webp";
import FormLogin from "./FormLogin";
import { useEffect, useState } from 'react';


const Loginpage = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768); // change breakpoint as needed
    }

    // Set initial value based on localStorage if available
    const localStorageValue = localStorage.getItem("isMobile");
    if (localStorageValue !== null) {
      setIsMobile(localStorageValue === "true");
    } else {
      handleResize();
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Save `isMobile` state to localStorage
  useEffect(() => {
    localStorage.setItem("isMobile", String(isMobile));
  }, [isMobile]);

  return (
    <div>
      {
        isMobile ? 
        (<div className="mx-6">
          <div className="mt-20 space-y-2">
          <h1 className="text-3xl font-bold">Sign In</h1>
          <p className="text-gray-400"> Do you have account? <Link href={"/auth/register"} className="text-blue-500 font-semibold">Register Now</Link>
          </p>
          <FormLogin />
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
          <FormLogin />
        </div>
      </div>
        )
      }
    </div>
  );
};

export default Loginpage;
