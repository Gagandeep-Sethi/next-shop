"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export const useNewProduct = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const router = useRouter();

  const addProduct = async (formValue, _id) => {
    const {
      name,
      category,
      description,
      images,
      originalPrice,
      discountedPrice,
      size,
      warranty,
    } = formValue;
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("warranty", warranty);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("originalPrice", originalPrice);
      formData.append("discountedPrice", discountedPrice);
      formData.append("size", size);

      // Append each file to the form data
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }

      const response = await fetch(`/api/product/newProduct`, {
        method: "POST",
        body: formData,
      });
      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(json.message);
      }
      if (response.ok) {
        setIsLoading(false);

        router.push(`/product/${json?.product?._id}`);
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
      setIsLoading(false);
    }
  };

  return { addProduct, isLoading, error };
};
