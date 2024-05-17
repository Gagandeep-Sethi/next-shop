"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  addBolsters,
  addCushions,
  addMattresses,
  addPillows,
} from "@/provider/redux/productSlice";

const useAllProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((store) => store?.product);

  useEffect(() => {
    async function getData() {
      try {
        const fetchProducts = async (type) => {
          const response = await fetch(
            `/api/product/category?type=${type}&limit=4`
          );
          if (!response.ok) {
            throw new Error(`Failed to fetch ${type} products`);
          }
          const data = await response.json();
          return data.product;
        };

        if (products?.pillow === null) {
          const pillows = await fetchProducts("pillow");
          dispatch(addPillows(pillows));
        }
        if (products?.bolster === null) {
          const bolsters = await fetchProducts("bolster");
          dispatch(addBolsters(bolsters));
        }
        if (products?.cushion === null) {
          const cushions = await fetchProducts("cushion");
          dispatch(addCushions(cushions));
        }
        if (products?.mattress === null) {
          const mattresses = await fetchProducts("mattress");
          dispatch(addMattresses(mattresses));
        }
      } catch (error) {
        console.error(error.message);
      }
    }

    getData();
  }, [dispatch, products]);
};

export default useAllProducts;
