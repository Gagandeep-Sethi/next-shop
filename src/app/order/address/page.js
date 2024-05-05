import Address from "@/app/(components)/Address";
import React from "react";
import { IoCheckmarkCircle } from "react-icons/io5";

const page = () => {
  return (
    <div>
      <div className="flex justify-center w-full">
        <ul className="timeline">
          <li>
            <div className="timeline-start timeline-box text-green-500 border-green-500">
              Cart
            </div>
            <div className="timeline-middle">
              <IoCheckmarkCircle className="w-5 h-5 text-green-500" />
            </div>
            <hr className="bg-green-500" />
          </li>
          <li>
            <hr className="bg-green-500" />
            <div className="timeline-start timeline-box text-green-500 border-green-500">
              Address
            </div>
            <div className="timeline-middle">
              <IoCheckmarkCircle className="w-5 h-5 " />
            </div>
            <hr />
          </li>
          <li>
            <hr />
            <div className="timeline-start timeline-box">Payment</div>
            <div className="timeline-middle">
              <IoCheckmarkCircle className="w-5 h-5" />
            </div>
          </li>
        </ul>
      </div>
      <Address />
    </div>
  );
};

export default page;
