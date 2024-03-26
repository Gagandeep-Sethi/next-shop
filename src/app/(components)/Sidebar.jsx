import { toggleState } from "@/provider/redux/sidebarSlice";
import React from "react";
import { useDispatch } from "react-redux";

const Sidebar = () => {
  const dispatch = useDispatch();
  return (
    <div className="space-y-5 w-full ">
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
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="  w-10 m-1     h-8 fill-current text-black  "
          >
            <title />
            <g id="Complete">
              <g id="user">
                <g>
                  <path
                    d="M20,21V19a4,4,0,0,0-4-4H8a4,4,0,0,0-4,4v2"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  />

                  <circle
                    cx="12"
                    cy="7"
                    fill="none"
                    r="4"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  />
                </g>
              </g>
            </g>
          </svg>
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
