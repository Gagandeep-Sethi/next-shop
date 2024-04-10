import { RxHamburgerMenu } from "react-icons/rx";

import { IoHome } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { CiShoppingCart, CiUser } from "react-icons/ci";
import Link from "next/link";
import SubNav from "./SubNav";
import NavLinks from "./NavLinks";
const Drawer = () => {
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full flex justify-between navbar bg-base-300">
          <div className="flex space-x-5">
            <div>
              <Link href="/">
                <IoHome className="w-7 h-7  text-black transition-colors duration-300 hover:text-orange-500" />
              </Link>
            </div>
            <NavLinks />
          </div>

          <div className="flex space-x-2 lg:space-x-4">
            <div className=" ">
              <Link href="/search">
                <IoSearchOutline className="w-7 h-6  text-black transition-colors duration-300 hover:text-orange-500 " />
              </Link>
            </div>
            <div className=" ">
              <Link href="/cart">
                <CiShoppingCart className="w-7 h-7  text-black transition-colors duration-300 hover:text-orange-500" />
              </Link>
            </div>
            <div className="hidden md:flex ">
              <Link href="/user">
                <CiUser className="w-7 h-7  text-black transition-colors duration-300 hover:text-orange-500" />
              </Link>
            </div>
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <RxHamburgerMenu className="w-7 h-6" />
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200">
          {/* Sidebar content here */}
          <li>
            <CiUser className="m-2 w-6 h-6 text-black" />
            SignUp/SignIn
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Drawer;
