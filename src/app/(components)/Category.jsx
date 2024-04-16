"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardContainer from "./CardContainer";
import Skeleton from "./Skeleton";

const Category = () => {
  const [product, setProduct] = useState([]);
  const params = useParams();
  const { type } = params;
  const products = useSelector((store) => store?.product);
  const category = products[type];
  console.log(category, "category");

  useEffect(() => {
    if (category) {
      setProduct(category);
    }
    if (!category) {
      getData();
    }
    const getData = async () => {
      try {
        const response = await fetch(`/api/product/category/${type}`);
        const json = await response.json();
        console.log(json, "json");
        if (response.ok) {
          setProduct(json?.product);
        }
      } catch (error) {
        console.log(error);
      }
    };
  }, [category, type]);
  if (product.length === 0) return <Skeleton />;
  console.log(product, "product");
  return (
    <div>
      <h1 className="text-center text-3xl mt-6 underline">
        {type.toUpperCase()}S
      </h1>
      <CardContainer data={product} />;
    </div>
  );
};

export default Category;
