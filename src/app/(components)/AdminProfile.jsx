"use client";
import React, { useState } from "react";
import Rating from "./Rating";
import { MdRateReview } from "react-icons/md";
import { FaBoxOpen, FaChevronLeft } from "react-icons/fa";
import { TbPasswordFingerprint } from "react-icons/tb";
import { GiDeerTrack } from "react-icons/gi";
import ChangePassword from "./ChangePassword";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import NewProduct from "./NewProduct";
import { FaBox } from "react-icons/fa6";
import { TbUserSearch } from "react-icons/tb";
import { HiTemplate } from "react-icons/hi";
import SearchUser from "./SearchUser";
import UserOrders from "./UserOrders";
import { deleteUser } from "@/provider/redux/userSlice";
import { emptyCart } from "@/provider/redux/cartSlice";

const AdminProfile = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const user = useSelector((store) => store?.user?.user);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };
  function refreshPage() {
    window.location.reload();
  }
  function deleteCookie(name) {
    document.cookie =
      name +
      "=; Max-Age=0; path=/; domain=" +
      window.location.hostname +
      "; secure; samesite=lax";
  }
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.log("response not ok");
        throw new Error("Failed to logout");
      } else {
        console.log("response ok");

        dispatch(deleteUser());
        dispatch(emptyCart());
        deleteCookie("user");
        deleteCookie("token");
        refreshPage();
      }
    } catch (error) {}
  };

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
                          No
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

        <div
          onClick={() => handleOptionClick("newProduct")}
          className={` flex items-center w-full text-left p-4 rounded-md mt-2 border-b-2 border-gray-200 cursor-pointer ${
            selectedOption === "newProduct" ? "bg-blue-500 text-white" : ""
          }`}
        >
          <HiTemplate className="w-8 h-6" />

          <p>New Product</p>
        </div>

        <div
          onClick={() => handleOptionClick("searchUsers")}
          className={` flex items-center w-full text-left p-4 rounded-md mt-2 border-b-2 border-gray-200 cursor-pointer ${
            selectedOption === "searchUsers" ? "bg-blue-500 text-white" : ""
          }`}
        >
          <TbUserSearch className="w-8 h-6" />

          <p>Search Users</p>
        </div>

        <div
          onClick={() => handleOptionClick("pendingOrders")}
          className={` flex items-center w-full text-left p-4 rounded-md mt-2 border-b-2 border-gray-200 cursor-pointer ${
            selectedOption === "pendingOrders" ? "bg-blue-500 text-white" : ""
          }`}
        >
          <FaBox className="w-8 h-6" />

          <p>Pending Orders</p>
        </div>

        <div
          onClick={() => handleOptionClick("allOrders")}
          className={` flex items-center w-full text-left p-4 rounded-md mt-2 border-b-2 border-gray-200 cursor-pointer ${
            selectedOption === "allOrders" ? "bg-blue-500 text-white" : ""
          }`}
        >
          <FaBox className="w-8 h-6" />

          <p>All Orders</p>
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

        {selectedOption === "trackOrders" && <div>No orders to track</div>}
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
            <Rating email={user?.email} />
          </div>
        )}
        {selectedOption === "newProduct" && (
          <div>
            <NewProduct />
          </div>
        )}
        {selectedOption === "allOrders" && <div>All orders</div>}
        {selectedOption === "pendingOrders" && <div>Pending orders</div>}
        {selectedOption === "searchUsers" && (
          <div>
            <SearchUser />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;
