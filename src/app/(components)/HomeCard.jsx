//"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const HomeCard = ({ data }) => {
  return (
    <div className="w-full h-full flex flex-col justify-center shadow-md rounded-md pt-3 pb-1  bg-gray-50">
      <div>
        <Link href={`/product/${data._id}`}>
          <div className="md:mx-6 mx-5 h-32 md:h-56 ">
            <Image
              src={`https://res.cloudinary.com/dyja4tbmu/${data?.images[0]}.jpg`}
              width={320}
              height={320}
              alt="Shoes"
              className="rounded-lg w-full h-full transform transition-transform duration-300 hover:scale-105"
            />
          </div>
        </Link>
      </div>
      <div className="pt-3 px-2">
        <h2 className="  truncate text-center font-mans">{data?.name}</h2>

        {data?.isOutOfStock === "true" ? (
          <p className="text-red-500 text-center">Currently Out of Stock !!</p>
        ) : data?.displayPrice ? (
          <div className="flex pt-3 justify-center  ">
            <del className=" text-gray-400 text-sm ">
              ₹{data?.originalPrice}
            </del>
            <p className="text-green-600 ml-2 text-sm ">
              ₹{data?.displayPrice}
            </p>
          </div>
        ) : (
          <p className="pt-3 text-center text-sm ">₹{data?.originalPrice}</p>
        )}
      </div>
    </div>
  );
};

export default HomeCard;
