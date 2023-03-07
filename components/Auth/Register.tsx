import Image from "next/image";
import Link from "next/link";
import BgAuth from "../../public/assets/bg-auth.webp";
import FormRegister from "./FormRegister";
import MediaQuery from "../mediaQuery/MediaQuery";

const RegisterPage = () => {
  const isMobile = MediaQuery("(max-width: 600px)");

  return (
    <div>
      {
        isMobile ? 
        (
          <div className="mx-6 mt-16 space-y-2">
          <h1 className="text-3xl font-bold">Welcome to Maxx Store</h1>
          <p className="text-gray-400">
            I have allready account, <Link href={"/auth/login"} className="text-blue-500 font-semibold">
              Login now
            </Link>
          </p>
          <FormRegister isMobile={isMobile}/>
        </div>)
         : 
        (
        <div className="flex">
        <Image src={BgAuth} alt="" className=" w-[45vw] h-screen" />
        {/* Form */}
        <div className="mx-40 mt-32 space-y-2">
          <h1 className="text-3xl font-bold">Welcome to Maxx Store</h1>
          <p className="text-gray-400">
            I have allready account, <Link href={"/auth/login"} className="text-blue-500 font-semibold">
              Login now
            </Link>
          </p>
          <FormRegister isMobile={isMobile}/>
        </div>
      </div>
        )
      } 
    </div>
  );
};

export default RegisterPage;
