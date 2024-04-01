"use client";

import { toggleState } from "@/provider/redux/sidebarSlice";
import { useDispatch } from "react-redux";
import { IoSearchOutline } from "react-icons/io5";
import { CiShoppingCart, CiUser } from "react-icons/ci";

import { RxHamburgerMenu } from "react-icons/rx";

const SubNav = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center space-x-5 relative">
      <div className=" ">
        <IoSearchOutline className="w-7 h-7  text-black transition-colors duration-300 hover:text-orange-500 " />
      </div>
      <div className=" ">
        <CiShoppingCart className="w-7 h-7  text-black transition-colors duration-300 hover:text-orange-500" />
      </div>
      <div className="hidden md:flex ">
        <CiUser className="w-7 h-7  text-black transition-colors duration-300 hover:text-orange-500" />
      </div>
      <div className=" md:hidden  ">
        <RxHamburgerMenu
          onClick={() => dispatch(toggleState())}
          className="w-7 h-7  text-black transition-colors duration-300 hover:text-orange-500"
        />
      </div>
    </div>
  );
};

export default SubNav;
