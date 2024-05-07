"use client";

import { useState } from "react";

import { FiEye, FiEyeOff } from "react-icons/fi";
import { useChangePassword } from "../(hooks)/useChangePassword";

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formValue, setFormValue] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { changePassword, isLoading, error } = useChangePassword();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await changePassword(formValue);
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
        <h2 className="text-2xl font-bold mb-8 text-center">Change Password</h2>
        <form className="space-y-4  " onSubmit={handleSubmit}>
          <div className="flex flex-col relative">
            <label htmlFor="oldPassword" className="text-sm font-medium">
              Old Password
            </label>
            <input
              type="password"
              name="oldPassword"
              className="input"
              placeholder="Old Password"
              value={formValue.oldPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col relative">
            <label htmlFor="newPassword" className="text-sm font-medium">
              New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="newPassword"
              className="input"
              placeholder="New Password"
              value={formValue.newPassword}
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
            Must include no,symbol,upper,lowercase,min 8 letter long !
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
              {isLoading ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : null}
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
