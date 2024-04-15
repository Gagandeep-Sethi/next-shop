"use client";
import React, { useState } from "react";
import Image from "next/image";
import { addToCart } from "@/provider/redux/cartSlice";
import { useDispatch } from "react-redux";
import PopUpMessage from "./PopUpMessage";
import Link from "next/link";

const Card = ({ data }) => {
  const dispatch = useDispatch();
  const handleCart = () => {
    dispatch(addToCart(data));
    setPopupMessage("Item added to cart");
    setShowPopup(true);
  };
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  return (
    <div className="card card-compact w-80 bg-gray-200  shadow-xl">
      <Link href={`/product/${data._id}`}>
        <figure>
          <Image
            src={`https://res.cloudinary.com/dyja4tbmu/${data?.images[0]}.jpg`}
            width={320}
            height={320}
            alt="Shoes"
            className="rounded-t-2xl"
          />
        </figure>
      </Link>

      <div className="card-body ">
        <h2 className="card-title text-gray-800">{data?.name}</h2>
        <p className="text-gray-600">
          ₹{data?.displayPrice || data?.originalPrice}
        </p>
        <div className="card-actions justify-end">
          <button
            onClick={handleCart}
            className="btn bg-black hover:bg-primary text-white"
          >
            Add to Cart
          </button>
        </div>
      </div>
      {showPopup && (
        <PopUpMessage message={popupMessage} setShowPopup={setShowPopup} />
      )}
    </div>
  );
};

export default Card;
