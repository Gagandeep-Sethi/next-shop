"use client";
import { useState } from "react";

export const useUpdateProduct = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const updateProduct = async (formValue, productId) => {
    console.log("reached hook");
    const {
      name,
      category,
      description,
      images,
      originalPrice,
      discountedPrice,
      size,
      newImageUploads,
      deletedImages,
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
      for (let i = 0; i < deletedImages.length; i++) {
        formData.append("deletedImages", deletedImages[i]);
      }
      for (let i = 0; i < newImageUploads.length; i++) {
        formData.append("newImageUploads", newImageUploads[i]);
      }
      console.log("before req send");
      const response = await fetch(`/api/product/updateProduct/${productId}`, {
        method: "PUT",
        body: formData,
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
