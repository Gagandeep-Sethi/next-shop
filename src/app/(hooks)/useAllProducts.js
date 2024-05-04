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
        // const data = await fetch(`/api/product`);
        // const json = await data.json();
        if (products?.pillow === null) {
          console.log(products?.pillow, "pillow");
          const pillow = await fetch(
            `/api/product/category?type=pillow&limit=3`
          );
          const pillows = await pillow.json();
          dispatch(addPillows(pillows?.product));
        }
        if (products?.bolster === null) {
          console.log(products?.bolster, "bolster");
          const bolster = await fetch(
            `/api/product/category?type=bolster&limit=3`
          );
          const bolsters = await bolster.json();
          dispatch(addBolsters(bolsters?.product));
        }
        if (products?.cushion === null) {
          console.log(products?.cushion, "cushion");

          const cushion = await fetch(
            `/api/product/category?type=cushion&limit=3`
          );
          const cushions = await cushion.json();
          dispatch(addCushions(cushions?.product));
        }
        if (products?.mattress === null) {
          console.log(products?.mattress, "mattress");

          console.log("mattress called");
          const mattress = await fetch(
            `/api/product/category?type=mattress&limit=3`
          );
          const mattresses = await mattress.json();
          dispatch(addMattresses(mattresses?.product));
        }
        // console.log(pillows, "pillow");
        // console.log(bolsters, "bolster");
        // console.log(cushions, "cushions");
        // console.log(mattresses, "mattress");

        // const pillows = json?.product.filter(
        //   (res) => res.category === "pillow"
        // );
        // const bolsters = json?.product.filter(
        //   (res) => res.category === "bolster"
        // );
        // const cushions = json?.product.filter(
        //   (res) => res.category === "cushion"
        // );
        // const mattresses = json?.product.filter(
        //   (res) => res.category === "mattress"
        // );
      } catch (error) {
        console.log(error);
      }
    }
  }, [dispatch, products]);
};

export default useAllProducts;
