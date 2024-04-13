"use client";
import Link from "next/link";
import { useState } from "react";
import { useSignup } from "../(hooks)/useSignup";
import { signIn, useSession } from "next-auth/react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formValue, setFormValue] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    phoneNumber: "",
  });
  const session = useSession();
  const { signUp, isLoading, error } = useSignup();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUp(formValue);
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
        <h2 className="text-2xl font-bold mb-8 text-center">Sign Up</h2>
        <form className="space-y-4  " onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="username" className="text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              name="username"
              className="input"
              placeholder="Username"
              value={formValue.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Your email address"
              value={formValue.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phoneNumber" className="text-sm font-medium">
              Phone Number
            </label>
            <input
              type="number"
              name="phoneNumber"
              className="input"
              placeholder="Phone Number (Indian)"
              value={formValue.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col relative">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="input"
              placeholder="Your password"
              value={formValue.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center px-3"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <div className="">
                  <FiEye className="mt-5 w-6 h-5" />
                </div>
              ) : (
                <div className="">
                  <FiEyeOff className="mt-5 w-6 h-5" />
                </div>
              )}
            </button>
          </div>
          <p className="text-xs font-extralight">
            Must include no,symbol,uppercase,lower,min 8 letter long !
          </p>
          <div className="flex flex-col relative">
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              className="input"
              placeholder="Confirm password"
              value={formValue.confirmPassword}
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
              Sign Up
            </button>
          </div>
        </form>
        <div className="flex items-center mt-6">
          <div className="border-b border-gray-500 flex-grow"></div>
          <div className="mx-4 text-gray-500">or</div>
          <div className="border-b border-gray-500 flex-grow"></div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => signIn("google")}
            className="btn mt-6 bg-white text-gray-700 border border-gray-300 hover:border-gray-400 flex items-center justify-center"
          >
            <FcGoogle className="w-8 h-7" />
            Sign in with Google
          </button>
        </div>
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

export default SignUp;
