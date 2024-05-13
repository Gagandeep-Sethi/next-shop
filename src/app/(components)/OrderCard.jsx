import Image from "next/image";
import React from "react";

const OrderCard = ({ data }) => {
  return (
    <div>
      <div className="w-full md:justify-start   md:border-2 md:rounded-2xl md:my-6 md:m-6 border-gray-300 items-center   bg-white  ">
        <div className="flex flex-col     md:flex-row p-6 w-full md:gap-8 space-y-4 md:space-y-0 justify-center items-center">
          <div className="md:w-3/12 h-[230px] justify-center flex">
            <Image
              src={`https://res.cloudinary.com/dyja4tbmu/${data?.images[0]}.jpg`}
              className="w-64  h-full rounded-lg shadow-2xl"
              alt=""
              width={200}
              height={200}
            />
          </div>
          <div className="md:w-8/12 w-full " style={{ wordWrap: "break-word" }}>
            <p className="text-5xl   font-bold  text-center md:text-start">
              {data?.name}
            </p>
            <p className="pt-3 text-center md:text-start">
              {data?.description}
            </p>
            {data?.displayPrice ? (
              <div className="flex pt-3 md:justify-start justify-center">
                <del className=" text-gray-400 ">₹{data?.originalPrice}</del>
                <p className="text-green-600 ml-2">₹{data?.displayPrice}</p>
              </div>
            ) : (
              <p className="pt-3">₹{data?.originalPrice}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
