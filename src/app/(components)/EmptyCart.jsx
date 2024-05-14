import Image from "next/image";
import Link from "next/link";
import React from "react";

const EmptyCart = ({ value, button }) => {
  return (
    <div className=" min-h-svh flex flex-col justify-center items-center">
      <p className="text-center text-4xl md:text-6xl ">Opps {value}</p>
      <div className="my-10 flex justify-center  ">
        <Image src="/cart.png" alt="" width={320} height={500} />
      </div>
      <div className="flex justify-center">
        <Link href="/">
          <button className="  btn btn-sm md:btn-md lg:btn-lg bg-black text-white hover:bg-gray-700">
            {button}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;
