import Image from "next/image";
import Link from "next/link";
import React from "react";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  text-blue-500">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-8">Oops! Page not found.</p>
      <Image src="/404.png" alt="" width={320} height={500} />
      <Link href="/">
        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-xl hover:bg-blue-600 transition duration-300">
          Go back to homepage
        </button>
      </Link>
    </div>
  );
};

export default Error;
//bg-gradient-to-br from-orange-500 to-black
