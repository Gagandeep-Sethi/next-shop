"use client";

import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import dynamic from "next/dynamic";
import { FaArrowRight } from "react-icons/fa";
import useAllProducts from "../(hooks)/useAllProducts";

const Skeleton = dynamic(() => import("./Skeleton"), { ssr: false });
const TestCarousel = dynamic(() => import("./TestCorousal"), { ssr: false });
const HomeCardContainer = dynamic(() => import("./HomeCardContainer"), {
  ssr: false,
});

const Home = () => {
  const products = useSelector((store) => store?.product);
  useAllProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-11/12 mx-auto h-[500px] md:h-[740px]">
        {products?.mattress?.[3]?.images?.length > 3 ? (
          <TestCarousel images={products.mattress[3].images} />
        ) : (
          <div className="skeleton w-11/12 mx-auto h-[300px] md:h-[600px] mt-6"></div>
        )}
      </div>
      {["pillow", "cushion", "bolster", "mattress"].map((category) => (
        <div key={category}>
          <h1 className="mt-6 mb-2 text-3xl md:text-4xl text-center font-space">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </h1>
          <div className="w-full">
            {products?.[category] ? (
              <HomeCardContainer data={products[category].slice(0, 4)} />
            ) : (
              <Skeleton count={4} />
            )}
            <div className="flex justify-center my-6 md:my-10">
              <Link href={`/product/category/${category}`}>
                <button className="btn btn-xs sm:btn-sm md:btn-md bg-black hover:bg-primary text-white">
                  See more <FaArrowRight />
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
