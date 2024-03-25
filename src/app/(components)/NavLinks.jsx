import Link from "next/link";
import React from "react";

const NavLinks = () => {
  return (
    <div className="flex">
      <Link
        href="/"
        className=" mx-4 transition-colors duration-300 hover:text-orange-500"
      >
        Phone
      </Link>
      <Link
        href="/"
        className="mr-4 transition-colors duration-300 hover:text-orange-500"
      >
        Tv
      </Link>
      <Link
        href="/"
        className="mr-4 transition-colors duration-300 hover:text-orange-500"
      >
        Speaker
      </Link>
      <Link
        href="/"
        className="mr-4 transition-colors duration-300 hover:text-orange-500"
      >
        T-shirt
      </Link>
    </div>
  );
};

export default NavLinks;
