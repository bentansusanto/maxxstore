import Image from "next/image";
import Link from "next/link";
import BgAuth from "../../public/assets/bg-auth.webp";
import FormRegister from "./FormRegister";

const RegisterPage = () => {
  return (
    <div>
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
          <FormRegister />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
