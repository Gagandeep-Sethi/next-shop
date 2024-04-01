"use client";
import Link from "next/link";
import { useState } from "react";
import { useLogin } from "../(hooks)/useLogin";
import { signIn, useSession } from "next-auth/react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formValue, setFormValue] = useState({
    password: "",
    email: "",
  });
  const { login, isLoading, error } = useLogin();
  const session = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formValue);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prevFormValue) => ({
      ...prevFormValue,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white">
      <div className="max-w-md w-full px-6 py-8 bg-gray-200 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-8 text-center">Sign In</h2>
        <form className="space-y-4 " onSubmit={handleSubmit}>
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
          {error && <div className="text-red-600 text-lg">{error} !!</div>}
          <div className="flex justify-center">
            <button
              disabled={isLoading}
              type="submit"
              className="btn bg-blue-500 text-white hover:bg-blue-600 "
            >
              Sign In
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
          Do not have account ?{" "}
          <span className="text-black cursor-pointer  hover:text-blue-800 hover:underline">
            <Link href="signup">SignUp</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
