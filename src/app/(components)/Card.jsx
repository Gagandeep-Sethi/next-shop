"use client";
import React from "react";
import Image from "next/image";

const Card = () => {
  return (
    <div className="card card-compact w-80 bg-cardBg shadow-xl">
      <figure>
        <Image src="/shoes.jpg" width={320} height={320} alt="Shoes" />
      </figure>
      <div className="card-body ">
        <h2 className="card-title text-gray-800">Shoes!</h2>
        <p className="text-gray-600">₹500</p>
        <div className="card-actions justify-end">
          <button className="btn bg-cardBtn text-white">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
