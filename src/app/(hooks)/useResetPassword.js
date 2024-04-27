import { useRouter } from "next/navigation";
import { useState } from "react";

export const useResetPassword = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const router = useRouter();

  const resetPassword = async (formValue) => {
    const { token, newPassword, confirmPassword } = formValue;

    setIsLoading(true);
    setError(null);
    const response = await fetch(`/api/users/resetPassword`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword, confirmPassword }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.message);
      console.log(json.message);
    }
    if (response.ok) {
      console.log(response);
      router.push("/user/login");
      setIsLoading(false);
    }
  };
  return { resetPassword, isLoading, error };
};
