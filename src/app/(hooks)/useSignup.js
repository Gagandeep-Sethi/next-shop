"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
//import { addUser } from "../store/userSlice";
//import { Fetch_Uri } from "../constant";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const dispatch = useDispatch();
  const signUp = async (formValue) => {
    const { username, email, password, confirmPassword } = formValue;
    setIsLoading(true);
    setError(null);
    const response = await fetch(`${Fetch_Uri}/api/user/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password, confirmPassword }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.message);
    }
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch(addUser(json));
      setIsLoading(false);
    }
  };
  return { signUp, isLoading, error };
};
