"use client";
import { useState } from "react";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const addAddress = async (formValue) => {
    const { streetNo, houseNo, landmark, locality, state, city } = formValue;
    setIsLoading(true);
    setError(null);
    const response = await fetch(`/api/users/address`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        streetNo,
        houseNo,
        landmark,
        locality,
        state,
        city,
      }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.message);
    }
    if (response.ok) {
      setError(json.message);
      setIsLoading(false);
    }
  };
  return { addAddress, isLoading, error };
};
