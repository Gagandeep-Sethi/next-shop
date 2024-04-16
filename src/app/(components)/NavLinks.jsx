import Link from "next/link";
import React from "react";

const NavLinks = () => {
  return (
    <div className="hidden md:flex">
      <Link
        href="/product/category/mattress"
        className=" mx-4 transition-colors duration-300 hover:text-orange-500"
      >
        Mattress
      </Link>
      <Link
        href="/product/category/pillow"
        className="mr-4 transition-colors duration-300 hover:text-orange-500"
      >
        Pillow
      </Link>
      <Link
        href="/product/category/cushion"
        className="mr-4 transition-colors duration-300 hover:text-orange-500"
      >
        Cushion
      </Link>
      <Link
        href="/product/category/bolster"
        className="mr-4 transition-colors duration-300 hover:text-orange-500"
      >
        Bolster
      </Link>
      <Link
        href="/"
        className="mr-4 transition-colors duration-300 hover:text-orange-500"
      >
        Customize product
      </Link>
    </div>
  );
};

export default NavLinks;
