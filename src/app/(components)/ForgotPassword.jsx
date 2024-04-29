"use client";

import { useState } from "react";

import { useForgotPassword } from "../(hooks)/useForgotPassword";
import Link from "next/link";

const ForgotPassword = () => {
  const [formValue, setFormValue] = useState({
    email: "",
  });

  const { forgotPassword, isLoading, error } = useForgotPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(formValue);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prevFormValue) => ({
      ...prevFormValue,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white">
      <div className="max-w-md w-full px-6 py-8 bg-gray-200 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-8 text-center">Forgot Password</h2>
        <form className="space-y-4  " onSubmit={handleSubmit}>
          <div className="flex flex-col relative">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              type="text"
              name="email"
              className="input"
              placeholder="Email"
              value={formValue.email}
              onChange={handleChange}
              required
            />
          </div>
          {error && (
            <div className="text-red-600 mx-auto text-lg">{error} !!</div>
          )}

          <div className="flex justify-center">
            <button
              disabled={isLoading}
              type="submit"
              className="btn bg-blue-500 text-white hover:bg-blue-600 "
            >
              Send Link
            </button>
          </div>
        </form>
        <p className="text-center text-lg text-gray-600">
          Already have account !{" "}
          <span className="text-black cursor-pointer hover:text-blue-800 hover:underline">
            <Link href="/user/login">SignIn</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
