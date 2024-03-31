"use client";

import { useState } from "react";

export const useNewProduct = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const addProduct = async (formValue, _id) => {
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
      const formData = new FormData();
      formData.append("name", name);
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
        console.log("product added");
      }
    } catch (error) {
      setError("Error updating product. Please try again.");
      setIsLoading(false);
    }
  };

  return { addProduct, isLoading, error };
};

// import { useState } from "react";
// //import { Fetch_Uri } from "../constant"

// export const useNewProduct = () => {
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(null);

//   const addProduct = async (formValue, _id) => {
//     const {
//       name,
//       category,
//       description,
//       images,
//       originalPrice,
//       discountedPrice,
//       size,
//     } = formValue;
//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(`/api/product/newProduct`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//         body: JSON.stringify({
//           name,
//           category,
//           description,
//           images,
//           originalPrice,
//           discountedPrice,
//           size,
//         }),
//       });
//       const json = await response.json();

//       if (!response.ok) {
//         setIsLoading(false);
//         setError(json.message);
//       }
//       if (response.ok) {
//         setIsLoading(false);
//         console.log("product added");
//       }
//     } catch (error) {
//       setError("Error updating product. Please try again.");
//       setIsLoading(false);
//     }
//   };

//   return { addProduct, isLoading, error };
// };
