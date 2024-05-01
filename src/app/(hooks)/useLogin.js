import { addUser } from "@/provider/redux/userSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const router = useRouter();

  const dispatch = useDispatch();

  const parseCookies = () => {
    return document.cookie.split(";").reduce((cookies, cookie) => {
      const [name, value] = cookie.trim().split("=");
      return { ...cookies, [name]: value };
    }, {});
  };
  // Get user details from the cookie

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

      const { user } = parseCookies();
      const decodedUser = decodeURIComponent(user || "");
      const presentUser = JSON.parse(decodedUser || "{}");
      if (presentUser) {
        dispatch(addUser(presentUser));
      }
      console.log(presentUser, "presentuser");

      router.push("/user");
    }
  };
  return { login, isLoading, error };
};
