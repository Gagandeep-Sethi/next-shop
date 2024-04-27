"use client";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoHome } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { CiShoppingCart, CiUser } from "react-icons/ci";
import Link from "next/link";
import NavLinks from "./NavLinks";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser } from "@/provider/redux/userSlice";

const Header = () => {
  const user = useSelector((store) => store?.user?.user);
  const cart = useSelector((store) => store?.cart.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    const parseCookies = () => {
      return document.cookie.split(";").reduce((cookies, cookie) => {
        const [name, value] = cookie.trim().split("=");
        return { ...cookies, [name]: value };
      }, {});
    };
    const { user } = parseCookies();
    const decodedUser = decodeURIComponent(user || "");
    const presentUser = JSON.parse(decodedUser || "{}");
    if (presentUser) {
      dispatch(addUser(presentUser));
    }
  }, [dispatch]);
  return (
    <div className="drawer-end ">
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

            <div className="indicator">
              <span className="indicator-item badge bg-green-400  ">
                {cart ? cart.length : 0}
              </span>
              <button>
                <Link href="/cart">
                  <CiShoppingCart className="w-7 h-7  text-black transition-colors duration-300 hover:text-orange-500" />
                </Link>
              </button>
            </div>

            <div
              className="hidden md:flex tooltip tooltip-bottom"
              data-tip={user ? user?.username : "login"}
            >
              <button>
                <Link href="/user">
                  <CiUser className="w-7 h-7  text-black transition-colors duration-300 hover:text-orange-500" />
                </Link>
              </button>
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

      <div className="drawer-side z-20">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul className="menu p-4 w-80 min-h-full bg-base-200 space-y-">
          {/* Sidebar content here */}
          <Link
            onClick={() => {
              document.getElementById("my-drawer-3")?.click();
            }}
            href="/user"
          >
            <h1 className="flex items-center">
              <CiUser className="m-2 w-6 h-6 text-black" />
              {user ? "Account" : "SignUp/SignIn"}
            </h1>
          </Link>
          <li aria-label="close sidebar">
            <Link
              onClick={() => {
                document.getElementById("my-drawer-3")?.click();
              }}
              href="/product/category/cushion"
              className="mr-4 transition-colors duration-300 hover:text-orange-500"
            >
              Cushion
            </Link>
          </li>
          <li aria-label="close sidebar">
            <Link
              onClick={() => {
                document.getElementById("my-drawer-3")?.click();
              }}
              href="/product/category/pillow"
              className="mr-4 transition-colors duration-300 hover:text-orange-500"
            >
              Pillow
            </Link>
          </li>
          <li aria-label="close sidebar">
            <Link
              onClick={() => {
                document.getElementById("my-drawer-3")?.click();
              }}
              href="/product/category/mattress"
              className="mr-4 transition-colors duration-300 hover:text-orange-500"
            >
              Mattress
            </Link>
          </li>
          <li aria-label="close sidebar">
            <Link
              onClick={() => {
                document.getElementById("my-drawer-3")?.click();
              }}
              href="/product/category/bolster"
              className="mr-4 transition-colors duration-300 hover:text-orange-500"
            >
              Bolster
            </Link>
          </li>
          <li aria-label="close sidebar">
            <Link
              onClick={() => {
                document.getElementById("my-drawer-3")?.click();
              }}
              href="/"
              className="mr-4 transition-colors duration-300 hover:text-orange-500"
            >
              Customize product
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Header;
