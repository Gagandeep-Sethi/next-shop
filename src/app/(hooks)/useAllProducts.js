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
    getData();
    async function getData() {
      try {
        if (products?.pillow === null) {
          const pillow = await fetch(
            `/api/product/category?type=pillow&limit=4`
          );
          const pillows = await pillow.json();
          dispatch(addPillows(pillows?.product));
        }
        if (products?.bolster === null) {
          const bolster = await fetch(
            `/api/product/category?type=bolster&limit=4`
          );
          const bolsters = await bolster.json();
          dispatch(addBolsters(bolsters?.product));
        }
        if (products?.cushion === null) {
          const cushion = await fetch(
            `/api/product/category?type=cushion&limit=4`
          );
          const cushions = await cushion.json();
          dispatch(addCushions(cushions?.product));
        }
        if (products?.mattress === null) {
          const mattress = await fetch(
            `/api/product/category?type=mattress&limit=4`
          );
          const mattresses = await mattress.json();
          dispatch(addMattresses(mattresses?.product));
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [dispatch, products]);
};

export default useAllProducts;
