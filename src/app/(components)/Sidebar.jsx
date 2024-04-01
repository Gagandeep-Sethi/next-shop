import { toggleState } from "@/provider/redux/sidebarSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { CiUser } from "react-icons/ci";

const Sidebar = () => {
  const dispatch = useDispatch();
  return (
    <div className="space-y-5 w-full  bg-white">
      <div className="flex justify-end">
        <p
          onClick={() => dispatch(toggleState())}
          className="text-lg font-semibold  text-end mr-4 mt-6"
        >
          X
        </p>
      </div>

      <div className="flex justify-start  rounded-xl ">
        <div className="bg-gray-400 rounded-3xl ">
          <CiUser className="m-2 w-6 h-6" />
        </div>
        <p className="ml-2 my-auto ">Sign Up / Sign In</p>
      </div>
      <p className="font-medium text-lg cursor-pointer pl-4 text-left">Store</p>
      <p className="font-extralight cursor-pointer ml-2 pb-2 text-left border-b border-gray-400">
        Phone
      </p>
      <p className="font-extralight  cursor-pointer ml-2 pb-2  text-left border-b border-gray-400">
        Phone
      </p>
      <p className="font-extralight  cursor-pointer ml-2 pb-2 text-left border-b border-gray-400">
        Phone
      </p>
      <p className="font-extralight  cursor-pointer ml-2 pb-2 text-left border-b border-gray-400">
        Phone
      </p>
      <p className="font-extralight  cursor-pointer ml-2 pb-2 text-left border-b border-gray-400">
        Phone
      </p>
      <p className="font-extralight  cursor-pointer ml-2 pb-2 text-left border-b border-gray-400">
        Phone
      </p>
      <p className="font-extralight  cursor-pointer ml-2 pb-2 text-left border-b border-gray-400">
        Support
      </p>
      <p className="font-extralight  cursor-pointer ml-2 pb-2 text-left border-b border-gray-400">
        Contact Us
      </p>
    </div>
  );
};

export default Sidebar;
