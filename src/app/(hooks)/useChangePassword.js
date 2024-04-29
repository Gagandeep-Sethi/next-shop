import { useRouter } from "next/navigation";
import { useState } from "react";

export const useChangePassword = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const router = useRouter();

  const changePassword = async (formValue) => {
    const { oldPassword, newPassword, confirmPassword } = formValue;
    console.log(oldPassword, "oldPassword");
    console.log(newPassword, "oldPassword");
    console.log(confirm, "oldPassword");

    setIsLoading(true);
    setError(null);
    const response = await fetch(`/api/users/changePassword`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oldPassword, newPassword, confirmPassword }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.message);
      console.log(json.message);
    }
    if (response.ok) {
      console.log(response);
      router.refresh();

      setIsLoading(false);
    }
  };
  return { changePassword, isLoading, error };
};
