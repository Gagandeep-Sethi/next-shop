import { useState } from "react";
//import { useDispatch } from "react-redux";
//import { addUser } from "../store/userSlice";
//import { Fetch_Uri } from "../constant";

export const useChangePassword = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  //const dispatch = useDispatch();
  const changePassword = async (formValue) => {
    const { oldPassword, newPassword, conformPassword } = formValue;
    setIsLoading(true);
    setError(null);
    const response = await fetch(`/api/users/changePassword`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oldPassword, newPassword, conformPassword }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.message);
      console.log(json.message);
    }
    if (response.ok) {
      console.log(response);
      //localStorage.setItem("user", JSON.stringify(json)); //to store item in local storage of browser by name user
      //dispatch(addUser(json));
      setIsLoading(false);
    }
  };
  return { changePassword, isLoading, error };
};
