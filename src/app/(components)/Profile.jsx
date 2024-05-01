"use client";
import React, { useState } from "react";
import Rating from "./Rating";
import TrackingOrders from "./TrackingOrders";
import { MdRateReview } from "react-icons/md";
import { FaBoxOpen, FaChevronLeft } from "react-icons/fa";
import { TbPasswordFingerprint } from "react-icons/tb";
import { GiDeerTrack } from "react-icons/gi";
import ChangePassword from "./ChangePassword";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import UserOrders from "./UserOrders";
import { deleteUser } from "@/provider/redux/userSlice";

const Profile = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const user = useSelector((store) => store?.user?.user);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };
  const handleLogout = async () => {
    console.log("logout function reached");
    try {
      await fetch("/api/users/logout");
      dispatch(deleteUser());
      router.push("/user/login");
    } catch (error) {
      console.log(error);
    }
  };
  // const handleLogout = () => {
  //   dispatch(deleteUser());
  //   router.push("/user/login");
  // };

  return (
    <div className="flex min-h-screen ">
      <div
        className={
          (selectedOption && "hidden md:block") +
          " md:block w-screen  md:w-1/4    p-4 md:border-r-2 md:border-gray-200"
        }
      >
        {user?.username ? (
          <div className="">
            <p className="text-lg font-bold text-center pt-2">
              Hey {user?.username} !
            </p>
            <p className="  text-center pt-2">{user?.email}</p>
            <p className="text-lg  text-center pt-2">{user?.phoneNumber}</p>
            <div className="flex justify-center">
              <button
                className="btn btn-primary text-white  btn-sm md:btn-md "
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
              >
                Logout
              </button>

              <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                  <p className="py-4">Are you sure you want to logout !!</p>
                  <div className="flex justify-center items-center">
                    <div>
                      <button
                        onClick={handleLogout}
                        className="btn bg-green-500 hover:bg-green-600 text-white  btn-sm md:btn-md "
                      >
                        Yes
                      </button>
                    </div>
                    <div className="modal-action justify-center mt-0">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="bg-red-500 hover:bg-red-600 btn text-white  btn-sm md:btn-md ">
                          Close
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>
            </div>
          </div>
        ) : null}

        <div
          onClick={() => handleOptionClick("myOrders")}
          className={` flex items-center  w-full text-left p-4 rounded-md  border-b-2 border-gray-200 cursor-pointer mt-4 ${
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
      <div
        className={
          (!selectedOption && "hidden md:block") +
          " md:block w-screen md:w-3/4 p-4"
        }
      >
        <p
          onClick={() => setSelectedOption(null)}
          className=" block md:hidden  cursor-pointer   "
        >
          <FaChevronLeft className="h-8" />
        </p>

        {selectedOption === "trackOrders" && (
          <div>
            <TrackingOrders />
          </div>
        )}
        {selectedOption === "myOrders" && (
          <div>
            <UserOrders email={user?.email} />
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
      </div>
    </div>
  );
};

export default Profile;
