"use client";
import React from "react";
import NavLinks from "./NavLinks";
import SubNav from "./SubNav";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";

const Header = () => {
  const sidebar = useSelector((store) => store?.sidebar);
  return (
    <div className="flex justify-between shadow-lg sticky top-0 z-[20] w-full bg-white">
      <div className="p-4 flex items-center">
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 lg:w-10 lh:h-10 fill-current text-black transition-colors duration-300 hover:text-orange-500 "
        >
          <path
            fill="none"
            d="M22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            fill="none"
            d="M15 18H9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <div className=" lg:">
          <NavLinks />
        </div>
      </div>
      <SubNav />
      {sidebar ? (
        <div className="w-screen absolute z-30  top-0 left-0 bottom-0 bg-white  ">
          <Sidebar />
        </div>
      ) : null}
    </div>
  );
};

export default Header;
