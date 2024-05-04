"use client";
import React from "react";
import useAllProducts from "../(hooks)/useAllProducts";
import { useSelector } from "react-redux";
import CardContainer from "./CardContainer";
import Link from "next/link";
import Skeleton from "./Skeleton";

const Home = () => {
  const products = useSelector((store) => store?.product);
  useAllProducts();

  //if (!products?.pillow || !products?.pillow) return <Skeleton />;

  return (
    <div className="min-h-svh    ">
      <h1 className="my-6 text-3xl text-center underline">Pillows</h1>
      <div>
        {products?.pillow ? (
          <CardContainer data={products?.pillow.slice(0, 3)} />
        ) : (
          <Skeleton count={3} />
        )}

        <div className="flex justify-center my-6 md:my-10">
          <Link href="/product/category/pillow">
            <button className="btn btn-xs sm:btn-sm md:btn-md bg-black hover:bg-primary text-white ">
              See more
            </button>
          </Link>
        </div>
      </div>

      <h1 className="my-6 text-3xl text-center underline">Cushions</h1>
      <div>
        {products?.cushion ? (
          <CardContainer data={products?.cushion.slice(0, 3)} />
        ) : (
          <Skeleton count={3} />
        )}
        <div className="flex justify-center my-6">
          <Link href="/product/category/cushion">
            <button className="btn btn-xs sm:btn-sm md:btn-md bg-black hover:bg-primary text-white ">
              See more
            </button>
          </Link>
        </div>
      </div>

      <h1 className="my-6 text-3xl text-center underline">Bolsters</h1>
      <div>
        {products?.bolster ? (
          <CardContainer data={products?.bolster} />
        ) : (
          <Skeleton count={3} />
        )}
        <div className="flex justify-center my-6">
          <Link href="/product/category/bolster">
            <button className="btn btn-xs sm:btn-sm md:btn-md bg-black hover:bg-primary text-white ">
              See more
            </button>
          </Link>
        </div>
      </div>

      <h1 className="my-6 text-3xl text-center underline">Mattresses</h1>
      <div>
        {products?.mattress ? (
          <CardContainer data={products?.mattress} />
        ) : (
          <Skeleton count={3} />
        )}
        <div className="flex justify-center my-6">
          <Link href="/product/category/mattress">
            <button className="btn btn-xs sm:btn-sm md:btn-md bg-black hover:bg-primary text-white ">
              See more
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
