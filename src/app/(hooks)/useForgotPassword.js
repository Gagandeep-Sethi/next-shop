import { useState } from "react";

export const useForgotPassword = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const forgotPassword = async (formValue) => {
    const { email } = formValue;
    setIsLoading(true);
    setError(null);
    const response = await fetch(`/api/users/forgotPassword`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.message);
      console.log(json.message);
    }
    if (response.ok) {
      console.log(response);
      setError(json.message);

      setIsLoading(false);
    }
  };
  return { forgotPassword, isLoading, error };
};
