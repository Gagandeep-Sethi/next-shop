"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardContainer from "./CardContainer";
import Skeleton from "./Skeleton";
import { TbRulerMeasure } from "react-icons/tb";
import { FcMoneyTransfer } from "react-icons/fc";
import { GiStarsStack } from "react-icons/gi";
import {
  addBolsters,
  addCushions,
  addMattresses,
  addPillows,
} from "@/provider/redux/productSlice";
import Image from "next/image";

const Category = () => {
  const [product, setProduct] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [filter, setFilter] = useState({
    size: "all",
    price: "all",
    rating: 0,
  });
  const params = useParams();
  const { type } = params;
  const products = useSelector((store) => store?.product);
  const category = products[type];
  const dispatch = useDispatch();
  console.log(category, "category");

  const handleChange = (e) => {
    const { name, value } = e.target;
    return setFilter((prevFilterValue) => ({
      ...prevFilterValue,
      [name]: value,
    }));
  };

  // Handle filters
  useEffect(() => {
    let filteredProducts = [...allProducts];

    // Filter by size
    if (filter.size !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.size === filter.size
      );
    }

    // Filter by rating
    if (filter.rating !== 0) {
      filteredProducts = filteredProducts.filter(
        (product) => (product?.avgRating ?? 0) >= filter.rating
      );
    }

    // Sort by price
    if (filter.price === "lowToHigh") {
      filteredProducts = filteredProducts.sort(
        (a, b) =>
          (a.displayPrice || a.originalPrice) -
          (b.displayPrice || b.originalPrice)
      );
    } else if (filter.price === "highToLow") {
      filteredProducts = filteredProducts.sort(
        (a, b) =>
          (b.displayPrice || b.originalPrice) -
          (a.displayPrice || a.originalPrice)
      );
    }

    // Update the product state with the filtered and sorted products
    setProduct(filteredProducts);
  }, [filter, allProducts]);

  useEffect(() => {
    if (category !== null && category.length > 3) {
      setProduct(category);
      setAllProducts(category);
    }
  }, [category]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(
          `/api/product/category?type=${type}&limit=all`
        );
        const json = await response.json();
        if (response.ok) {
          setProduct(json?.product);
          setAllProducts(json?.product);

          switch (type) {
            case "pillow":
              dispatch(addPillows(json?.product));
              break;
            case "cushion":
              dispatch(addCushions(json?.product));
              break;
            case "bolster":
              dispatch(addBolsters(json?.product));
              break;
            case "mattress":
              dispatch(addMattresses(json?.product));
              break;
            default:
              break;
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (category === null || category.length <= 4) {
      getData();
    }
  }, [type, dispatch, category]);

  return (
    <div className="md:flex w-screen min-h-svh md:space-x-6 font-">
      <div className="  md:w-2/12">
        <p className="my-auto text-xl font-medium text-center mt-10">
          Filters:
        </p>
        <form className=" w-full    space-y-8 my-8">
          <div>
            <div className="flex w-full justify-center items-center space-x-1">
              <TbRulerMeasure />
              <p htmlFor="size" className="text-lg font-medium text-center">
                Size
              </p>
            </div>
            <select
              name="size"
              value={filter.size}
              onChange={handleChange}
              className="select w-full "
            >
              <option value="M">M</option>
              <option value="S">S</option>
              <option value="Full">Full</option>
              <option value="Half">Half</option>
              <option value="all">All</option>
            </select>
          </div>
          <div>
            <div className="flex w-full justify-center items-center space-x-1">
              <FcMoneyTransfer />
              <p htmlFor="price" className="text-lg  text-center font-medium">
                Price
              </p>
            </div>
            <select
              name="price"
              value={filter.price}
              onChange={handleChange}
              className="select w-full "
            >
              <option value="highToLow">High to Low</option>
              <option value="lowToHigh">Low to High</option>
              <option value="all">All</option>
            </select>
          </div>
          <div>
            <div className="flex w-full  justify-center items-center space-x-1">
              <GiStarsStack />
              <p htmlFor="rating" className="text-lg font-medium text-center">
                Rating
              </p>
            </div>
            <input
              type="range"
              name="rating"
              onChange={handleChange}
              min={0}
              max="5"
              value={filter.rating}
              className="range range-primary"
              step="1"
            />
            <div className="w-full flex justify-between text-xs px-2">
              <span>0</span>
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
            </div>
          </div>
        </form>
      </div>
      <div className=" md:w-10/12">
        {allProducts.length !== 0 && product.length === 0 ? (
          <div className="flex flex-col justify-center  ">
            <p className="text-center mt-10 text-4xl text-blue-600 ">
              Oops.. no product match your filters !!
            </p>
            <div className="flex justify-center">
              <Image src="/search.png" alt="" width={320} height={500} />
            </div>
          </div>
        ) : (
          <div className=" w-full mb-10">
            <h1 className="text-center text-3xl my-6 underline uppercase">
              {type}s
            </h1>
            {product.length !== 0 ? (
              <CardContainer data={product} />
            ) : (
              <div className="w-full  flex flex-wrap justify-evenly">
                <Skeleton count={6} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
