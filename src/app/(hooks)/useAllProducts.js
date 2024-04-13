"use client";
import { useDispatch } from "react-redux";

import { useEffect } from "react";

import {
  addBolsters,
  addCushions,
  addMattresses,
  addPillows,
} from "@/provider/redux/productSlice";

const useAllProducts = () => {
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      const data = await fetch(`/api/product`);
      const json = await data.json();

      const pillows = json?.product.filter((res) => res.category === "pillow");
      const bolsters = json?.product.filter(
        (res) => res.category === "bolster"
      );
      const cushions = json?.product.filter(
        (res) => res.category === "cushion"
      );
      const mattresses = json?.product.filter(
        (res) => res.category === "mattress"
      );
      dispatch(addPillows(pillows));
      dispatch(addCushions(cushions));
      dispatch(addBolsters(bolsters));
      dispatch(addMattresses(mattresses));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useAllProducts;
