"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardContainer from "./CardContainer";
import Skeleton from "./Skeleton";
import { TbRulerMeasure } from "react-icons/tb";
import { FcMoneyTransfer } from "react-icons/fc";
import { GiStarsStack } from "react-icons/gi";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "price") {
      return setFilter((prevFilterValue) => ({
        ...prevFilterValue,
        [name]: value,
      }));
    }
    // } else if (name === "size") {
    //   setFilter((prevFilterValue) => ({
    //     ...prevFilterValue,
    //     [name]: value,
    //   }));
    // } else if (name === "rating") {
    //   setFilter((prevFilterValue) => ({
    //     ...prevFilterValue,
    //     [name]: value,
    //   }));
    // }
    return setFilter((prevFilterValue) => ({
      ...prevFilterValue,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (category) {
      setProduct(category);
    }
    async function getData() {
      try {
        const response = await fetch(`/api/product/category/${type}`);
        const json = await response.json();
        if (response.ok) {
          setProduct(json?.product);
          setAllProducts(json?.product);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (!category) {
      getData();
    }
  }, [category, type]);

  // Handle filters
  useEffect(() => {
    let filteredProducts = allProducts;

    // Filter by size
    if (filter.size !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.size === filter.size
      );
    }

    // Filter by rating
    // if (filter.rating !== 0) {
    //   filteredProducts = filteredProducts.filter(
    //     (product) => product.rating >= filter.rating
    //   );
    // }

    // Sort by price
    if (filter.price === "lowToHigh") {
      filteredProducts = filteredProducts.sort(
        (a, b) =>
          (a.displayPrice || a.originalPrice) -
          (b.displayPrice || b.originalPrice)
      );
      console.log(filteredProducts, "price");
    } else if (filter.price === "highToLow") {
      filteredProducts = filteredProducts.sort(
        (a, b) =>
          (b.displayPrice || b.originalPrice) -
          (a.displayPrice || a.originalPrice)
      );
      console.log(filteredProducts, "price");
    }

    // Update the product state with the filtered and sorted products
    setProduct(filteredProducts);
  }, [filter, allProducts]);

  if (allProducts.length === 0) return <Skeleton />;
  console.log(product, "product");
  return (
    <div className="md:flex w-screen">
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
      {allProducts && product.length === 0 ? (
        <p>no products match your filters</p>
      ) : (
        <div className="md:w-10/12">
          <h1 className="text-center text-3xl my-6 underline">
            {type.toUpperCase()}S
          </h1>
          <CardContainer data={product} />;
        </div>
      )}
    </div>
  );
};

export default Category;
