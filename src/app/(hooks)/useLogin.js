import { useRouter } from "next/navigation";
import { useState } from "react";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const router = useRouter();

  const login = async (formValue) => {
    const { email, password } = formValue;
    setIsLoading(true);
    setError(null);
    const response = await fetch(`/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.message);
    }
    if (response.ok) {
      setIsLoading(false);
      router.push("/user");
    }
  };
  return { login, isLoading, error };
};
