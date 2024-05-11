"use client";
import React from "react";
import useAllProducts from "../(hooks)/useAllProducts";
import { useSelector } from "react-redux";
import Link from "next/link";
import Skeleton from "./Skeleton";
import TestCarousel from "./TestCorousal";
import HomeCardContainer from "./HomeCardContainer";
import { FaArrowRight } from "react-icons/fa";

const Home = () => {
  const products = useSelector((store) => store?.product);
  useAllProducts();
  console.log(products, "products");

  return (
    <div className="min-h-svh  bg-gray-50  ">
      <div className="w-11/12 md:h-[740px] h-[500px] mx-auto ">
        {products?.mattress !== null &&
        products?.mattress[0]?.images.length > 3 ? (
          <TestCarousel images={products?.mattress[3]?.images} />
        ) : (
          <div className="skeleton w-11/12 md:h-[600px] h-[300px] mx-auto  mt-6 "></div>
        )}
      </div>
      <h1 className="mt-6 mb-2 text-4xl text-center    font-space">Pillows</h1>
      <div className=" w-full ">
        {products?.pillow ? (
          <HomeCardContainer data={products?.pillow.slice(0, 4)} />
        ) : (
          <Skeleton count={4} />
        )}

        <div className="flex justify-center my-6 md:my-10">
          <Link href="/product/category/pillow">
            <button className="btn btn-xs sm:btn-sm md:btn-md bg-black hover:bg-primary text-white ">
              See more <FaArrowRight />
            </button>
          </Link>
        </div>
      </div>

      <h1 className="mt-6 mb-2 text-3xl text-center  font-space">Cushions</h1>
      <div>
        {products?.cushion ? (
          <HomeCardContainer data={products?.cushion.slice(0, 4)} />
        ) : (
          <Skeleton count={4} />
        )}
        <div className="flex justify-center my-6">
          <Link href="/product/category/cushion">
            <button className="btn btn-xs sm:btn-sm md:btn-md bg-black hover:bg-primary text-white ">
              See more <FaArrowRight />
            </button>
          </Link>
        </div>
      </div>

      <h1 className="mt-6 mb-2 text-3xl text-center  font-space">Bolsters</h1>
      <div>
        {products?.bolster ? (
          <HomeCardContainer data={products?.bolster.slice(0, 4)} />
        ) : (
          <Skeleton count={4} />
        )}
        <div className="flex justify-center my-6">
          <Link href="/product/category/bolster">
            <button className="btn btn-xs sm:btn-sm md:btn-md bg-black hover:bg-primary text-white ">
              See more <FaArrowRight />
            </button>
          </Link>
        </div>
      </div>

      <h1 className="mt-6 mb-2 text-3xl text-center  font-space">Mattresses</h1>
      <div>
        {products?.mattress ? (
          <HomeCardContainer data={products?.mattress.slice(0, 4)} />
        ) : (
          <Skeleton count={4} />
        )}
        <div className="flex justify-center my-6">
          <Link href="/product/category/mattress">
            <button className="btn btn-xs sm:btn-sm md:btn-md bg-black hover:bg-primary text-white ">
              See more <FaArrowRight />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
