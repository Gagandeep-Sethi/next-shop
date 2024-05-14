"use client";

//import { useRouter } from "next/navigation";
import { useState } from "react";

export const useReview = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  //const router = useRouter();

  const addReview = async (formValue, _id) => {
    const { comment, rating, email, productId, images } = formValue;
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("comment", comment);
      formData.append("rating", rating);
      formData.append("email", email);
      formData.append("productId", productId);
      // Append each file to the form data
      if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          formData.append("images", images[i]);
        }
      }

      const response = await fetch(`/api/product/newReview`, {
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
        setPopupMessage("Review added thanks for feedback");
        setShowPopup(true);

        //router.push(`/product/${json?.product?._id}`);
      }
    } catch (error) {
      setError(error.message);

      setIsLoading(false);
    }
  };

  return { addReview, isLoading, error, popupMessage, showPopup, setShowPopup };
};
