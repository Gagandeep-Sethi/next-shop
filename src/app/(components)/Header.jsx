"use client";
import React from "react";
import NavLinks from "./NavLinks";
import SubNav from "./SubNav";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { IoHome } from "react-icons/io5";
import Link from "next/link";

const Header = () => {
  const sidebar = useSelector((store) => store?.sidebar);
  return (
    <div className="flex justify-between shadow-lg sticky top-0 z-[20] w-full bg-white">
      <div className="p-4 flex items-center">
        <Link href="/">
          <IoHome className="w-7 h-7  text-black transition-colors duration-300 hover:text-orange-500" />
        </Link>

        <div className=" lg:">
          <NavLinks />
        </div>
      </div>
      <SubNav />
      {sidebar ? (
        <div className="w-screen absolute z-30  top-0 left-0 bottom-0 min-   ">
          <Sidebar />
        </div>
      ) : null}
    </div>
  );
};

export default Header;
