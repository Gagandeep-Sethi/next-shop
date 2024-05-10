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
import { addToCart } from "@/provider/redux/cartSlice";
import Sidebar from "./Sidebar";

const Header = () => {
  const user = useSelector((store) => store?.user?.user);
  const cart = useSelector((store) => store?.cart.cart);
  const dispatch = useDispatch();

  // Save cart data to local storage

  // Initialize cart from local storage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      const cartItems = JSON.parse(savedCart);
      // Add items to cart in Redux store
      cartItems.forEach((item) => {
        dispatch(addToCart(item));
      });
    }
  }, [dispatch]);

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
    <div className="drawer-end  ">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full flex justify-between navbar bg-white shadow-lg">
          <div className="flex space-x-5">
            <div>
              <Link href="/">
                <IoHome className="w-7 h-7  text-black transition-colors duration-300 hover:text-customColor" />
              </Link>
            </div>
            <NavLinks />
          </div>

          <div className="flex space-x-2 lg:space-x-4">
            <div className=" ">
              <Link href="/search">
                <IoSearchOutline className="w-7 h-6  text-black transition-colors duration-300 hover:text-customColor " />
              </Link>
            </div>

            <div className="indicator">
              <span className="indicator-item badge text-white bg-customColor  ">
                {cart.reduce((acc, res) => {
                  return acc + res.quantity;
                }, 0)}
              </span>
              <button>
                <Link href="/cart">
                  <CiShoppingCart className="w-7 h-7  text-black transition-colors duration-300 hover:text-customColor" />
                </Link>
              </button>
            </div>

            <div
              className="hidden md:flex tooltip tooltip-bottom"
              data-tip={user?.username ? user?.username : "Login"}
            >
              <button>
                <Link href="/user">
                  <CiUser className="w-7 h-7  text-black transition-colors duration-300 hover:text-customColor" />
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

        <Sidebar />
      </div>
    </div>
  );
};
export default Header;
