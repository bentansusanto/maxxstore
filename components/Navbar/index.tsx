import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiHomeSmile, BiUserCircle } from "react-icons/bi";
import { BsCart2, BsTelephoneOutbound } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { MdMiscellaneousServices, MdOutlineClose } from "react-icons/md";
import Logo from "../../public/logo-maxxstore.svg";
import { User } from "../../utils/typeauth";
import { MobileLink, QuicLink } from "../../utils/typepage";
import MediaQuery from "../mediaQuery/MediaQuery";
import NavIsAuth from "./NavIsAuth";

const links: QuicLink[] = [
  { page: "Home", link: "/" },
  { page: "Service", link: "/service" },
  { page: "Contact", link: "/contact" },
];

const mobileLinks: MobileLink[] = [
  { page: "Home", link: "/", icon: <BiHomeSmile /> },
  { page: "Service", link: "/service", icon: <MdMiscellaneousServices /> },
  { page: "Contact", link: "/contact", icon: <BsTelephoneOutbound /> },
];

const Navbar = () => {
  const [data, setData] = useState<User>();
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const base_Url = "https://web-service.herokuapp.com";
  // const [active, setActive] = useState('home')
  const isMobile = MediaQuery("(max-width: 600px)");
  const [openNav, setOpenNav] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`${base_Url}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Unauthorized");
        }
        const content = await response.json();
        setData(content);
        setIsAuth(true);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  // Logout User
  const Logout = async () => {
    try {
      const response = await fetch(`${base_Url}/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Unauthorized");
      }
      console.log(response);
      localStorage.removeItem("token");
      router.push("/auth/login");
    } catch (error) {
      throw error;
    }
  };

  const handleSideNav = () => {
    setOpenNav(!openNav);
  };

  return (
    <div>
      {isMobile ? (
        // Mobile Device
        <div className="py-4 flex items-center relative">
          <Image src={Logo} alt="logo-maxxstore" className="w-12 pl-5" />
          <div className="flex space-x-8 ml-auto pr-5">
            {/* Search */}
            <div>
              <FiSearch className="text-lg" />
            </div>
            {/* Cart */}
            <div className="relative">
              <BsCart2 className="text-lg" />
              <span className="bg-red-500 rounded-full py-.5 px-1.5 absolute top-0 left-3 text-[.75rem]">
                0
              </span>
            </div>
            <HiOutlineMenuAlt3
              onClick={handleSideNav}
              className="ml-auto text-xl"
            />
          </div>
          {/* SideNav */}
          <div
            className={`${
              openNav
                ? "bg-gray-200 w-full h-screen absolute top-0 p-5"
                : "hidden"
            }`}
          >
            <MdOutlineClose
              onClick={() => setOpenNav(false)}
              className="text-xl"
            />
            <div className="bg-gray-500 my-5 w-full h-[.5px]" />
            <div>
              {isAuth ? (
                <div className="flex space-x-3 items-center">
                  <BiUserCircle className="text-5xl" />
                  <div>
                    <p className="capitalize font-semibold">{data?.names}</p>
                    <p className="text-gray-500 text-[12px]">{data?.email}</p>
                  </div>
                </div>
              ) : (
                <div>
                  <ul className="flex space-x-5 justify-center items-center">
                    <li className="border border-black py-2.5 px-5 rounded-md">
                      <Link href={"/auth/login"}>Login</Link>
                    </li>
                    <li className="bg-black text-white py-2.5 px-5 rounded-md">
                      <Link href={"/auth/register"}>Register</Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <div className="bg-gray-500 my-5 w-full h-[.5px]" />
            <ul className="space-y-8">
              {mobileLinks.map((val, idx) => (
                <li key={idx} className="flex items-center space-x-2">    
                  <p className="text-lg">{val.icon}</p>
                  <Link href={val.link}>{val.page}</Link>
                </li>
              ))}
              <li onClick={Logout} className="text-red-500">
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        // Desktop Device
        <div className="px-20 py-4 flex items-center">
          <Image src={Logo} alt="logo-maxxstore" className="w-14" />

          {/* Navlink */}
          <ul className="flex space-x-10 ml-12">
            {links.map((val, idx) => (
              <li key={idx}>
                <Link href={val.link}>{val.page}</Link>
              </li>
            ))}
          </ul>

          {/* Link Icon */}
          <div className="flex items-center space-x-10 ml-auto mr-10">
            {/* Search */}
            <div>
              <FiSearch className="text-lg" />
            </div>
            {/* Cart */}
            <div className="relative">
              <BsCart2 className="text-lg" />
              <span className="bg-red-500 rounded-full py-.5 px-1.5 absolute top-0 left-3 text-[.75rem]">
                0
              </span>
            </div>
            {/* Auth */}
            <NavIsAuth isAuth={isAuth} data={data as User} Logout={Logout} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
