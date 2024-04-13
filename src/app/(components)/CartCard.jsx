import { addToCart, removeFromCart } from "@/provider/redux/cartSlice";
import Image from "next/image";
import React from "react";
import { FaMinusCircle } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { useDispatch } from "react-redux";

const CartCard = ({ data }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <div className="hero md:justify-start w-full md:border-2 md:rounded-2xl md:my-6 md:m-6 border-gray-300   bg-white  ">
        <div className="hero-content   flex-col lg:flex-row">
          <Image
            src={`https://res.cloudinary.com/dyja4tbmu/${data?.images[0]}.jpg`}
            className="max-w-sm rounded-lg shadow-2xl"
            alt=""
            width={200}
            height={200}
          />
          <div>
            <h1 className="text-5xl font-bold">{data?.name}</h1>
            <p className="pt-3">{data?.description}</p>
            {data?.displayPrice ? (
              <div className="flex pt-3 ">
                <del className=" text-gray-400 ">₹{data?.originalPrice}</del>
                <p className="text-green-600 ml-2">₹{data?.displayPrice}</p>
              </div>
            ) : (
              <p className="pt-3">₹{data?.originalPrice}</p>
            )}

            <div className="flex mt-4 items-center">
              <FaCirclePlus
                onClick={() => dispatch(addToCart(data))}
                className=" h-6 w-6 cursor-pointer text-green-600"
              />

              {/* <button>+</button> */}
              <p className=" mx-2">{data?.quantity}</p>
              {/* <button>-</button> */}
              <FaMinusCircle
                onClick={() => dispatch(removeFromCart(data?._id))}
                className="h-6 w-6 cursor-pointer text-red-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
