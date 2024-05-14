"use client";
import { useState } from "react";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  //const dispatch = useDispatch();
  const signUp = async (formValue) => {
    const { username, email, phoneNumber, password, confirmPassword } =
      formValue;
    setIsLoading(true);
    setError(null);
    const response = await fetch(`/api/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        email,
        password,
        confirmPassword,
        phoneNumber,
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
  return { signUp, isLoading, error };
};
