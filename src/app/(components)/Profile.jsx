"use client";
import React, { useState } from "react";
import Orders from "./Orders";
import Rating from "./Rating";
import Account from "./Account";
import TrackingOrders from "./TrackingOrders";
import { MdAccountTree, MdRateReview } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";
import { TbPasswordFingerprint } from "react-icons/tb";
import { GiDeerTrack } from "react-icons/gi";
import ChangePassword from "./ChangePassword";

const Profile = () => {
  const [selectedOption, setSelectedOption] = useState("myAccount");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="flex min-h-svh">
      <div className="w-1/4   p-4 border-r-2 border-gray-200">
        <h1 className="text-lg font-semibold ">Hello Sky</h1>
        <div
          onClick={() => handleOptionClick("myAccount")}
          className={` flex items-center  w-full text-left p-4 rounded-md  border-b-2 border-gray-200 cursor-pointer ${
            selectedOption === "myAccount" ? "bg-blue-500 text-white" : ""
          }`}
        >
          <MdAccountTree className="w-8 h-6" />

          <p>My Account</p>
        </div>
        <div
          onClick={() => handleOptionClick("myOrders")}
          className={` flex items-center  w-full text-left p-4 rounded-md  border-b-2 border-gray-200 cursor-pointer ${
            selectedOption === "myOrders" ? "bg-blue-500 text-white" : ""
          }`}
        >
          <FaBoxOpen className="w-8 h-6" />

          <p>My Orders</p>
        </div>
        <div
          onClick={() => handleOptionClick("changePassword")}
          className={`flex items-center w-full  text-left p-4 rounded-md mt-2 border-b-2 border-gray-200 cursor-pointer ${
            selectedOption === "changePassword" ? "bg-blue-500 text-white" : ""
          }`}
        >
          <TbPasswordFingerprint className="w-8 h-6" />

          <p>Change Password</p>
        </div>
        <div
          onClick={() => handleOptionClick("myRatingAndReviews")}
          className={`flex items-center w-full text-left p-4 rounded-md mt-2 border-b-2 border-gray-200 cursor-pointer ${
            selectedOption === "myRatingAndReviews"
              ? "bg-blue-500 text-white"
              : ""
          }`}
        >
          <MdRateReview className="w-8 h-6" />

          <p>My Rating and Reviews</p>
        </div>
        <div
          onClick={() => handleOptionClick("trackOrders")}
          className={` flex items-center w-full text-left p-4 rounded-md mt-2 border-b-2 border-gray-200 cursor-pointer ${
            selectedOption === "trackOrders" ? "bg-blue-500 text-white" : ""
          }`}
        >
          <GiDeerTrack className="w-8 h-6" />

          <p>Track Orders</p>
        </div>
      </div>
      <div className="w-3/4 p-4">
        {selectedOption === "myAccount" && (
          <div>
            <Account />
          </div>
        )}
        {selectedOption === "trackOrders" && (
          <div>
            <TrackingOrders />
          </div>
        )}
        {selectedOption === "myOrders" && (
          <div>
            <Orders />
          </div>
        )}
        {selectedOption === "changePassword" && (
          <div>
            <ChangePassword />
          </div>
        )}
        {selectedOption === "myRatingAndReviews" && (
          <div>
            <Rating />
          </div>
        )}
        {/* Add more content based on selected option */}
      </div>
    </div>
  );
};

export default Profile;
