"use client";
import { useState } from "react";
//import { Fetch_Uri } from "../constant"

export const useUpdateProduct = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const updateProduct = async (formValue, _id) => {
    const {
      name,
      category,
      description,
      images,
      originalPrice,
      discountedPrice,
      size,
    } = formValue;
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/product/updateProduct${_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          category,
          description,
          images,
          originalPrice,
          discountedPrice,
          size,
        }),
      });
      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(json.message);
      }
      if (response.ok) {
        setIsLoading(false);
        console.log("product updated");
      }
    } catch (error) {
      setError("Error updating product. Please try again.");
      setIsLoading(false);
    }
  };

  return { updateProduct, isLoading, error };
};
