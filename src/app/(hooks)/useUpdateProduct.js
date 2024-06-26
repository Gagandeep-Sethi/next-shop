"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useUpdateProduct = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const router = useRouter();

  const updateProduct = async (formValue, productId) => {
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
      stock,
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
      formData.append("stock", stock);

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

        router.push(`/product/${productId}`);
      }
    } catch (error) {
      setError("Error updating product. Please try again.");
      setIsLoading(false);
    }
  };

  return { updateProduct, isLoading, error };
};
