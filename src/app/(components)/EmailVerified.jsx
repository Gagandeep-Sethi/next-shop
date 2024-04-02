import Link from "next/link";
import React from "react";

const EmailVerified = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <p className="text-4xl font-bold text-green-500 mb-8 text-center ">
        Verification Successful!
      </p>
      <p className="text-lg text-gray-700 mb-12 text-center ">
        Thank you for verifying your email.
      </p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300">
        <Link href="/user/login">Login</Link>
      </button>
    </div>
  );
};

export default EmailVerified;
