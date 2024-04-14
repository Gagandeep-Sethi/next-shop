"use client";
import React from "react";
import Image from "next/image";
import { AddsHome } from "./AddsHome";
import useAllProducts from "../(hooks)/useAllProducts";
import { useSelector } from "react-redux";
import CardContainer from "./CardContainer";
import Test from "./Test";

const Home = () => {
  const products = useSelector((store) => store?.product);
  useAllProducts();

  if (!products?.pillows) return null;
  console.log(products?.pillows);
  return (
    <div className="min-h-svh    ">
      <h1 className="my-6 text-2xl">Pillow</h1>
      <div>
        <CardContainer data={products?.pillows} />
      </div>

      <h1 className="my-6 text-2xl">Cushion</h1>
      <div>
        <CardContainer data={products?.cushions} />
      </div>

      <h1 className="my-6 text-2xl">Bolster</h1>
      <div>
        <CardContainer data={products?.bolsters} />
      </div>

      <h1 className="my-6 text-2xl">Mattress</h1>
      <div>
        <CardContainer data={products?.mattresses} />
      </div>
    </div>
  );
};

export default Home;
