// import Link from "next/link";
// import React from "react";

// const NavLinks = () => {
//   return (
//     <div className="hidden md:flex">
//       <Link
//         href="/product/category/mattress"
//         className=" mx-4 transition-colors duration-300 hover:text-customColor"
//       >
//         Mattress
//       </Link>
//       <Link
//         href="/product/category/pillow"
//         className="mr-4 transition-colors duration-300 hover:text-customColor"
//       >
//         Pillow
//       </Link>
//       <Link
//         href="/product/category/cushion"
//         className="mr-4 transition-colors duration-300 hover:text-customColor hover:border-b-2 hover:border-customColor hover:"
//       >
//         Cushion
//       </Link>
//       <Link
//         href="/product/category/bolster"
//         className="mr-4 transition-colors duration-300 hover:text-customColor"
//       >
//         Bolster
//       </Link>
//       <Link
//         href="/"
//         className="mr-4 transition-colors duration-300 hover:text-customColor"
//       >
//         Customize product
//       </Link>
//     </div>
//   );
// };

// export default NavLinks;

import React, { useState } from "react";
import Link from "next/link";

const NavLinks = () => {
  const [activeTab, setActiveTab] = useState(null);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="hidden md:flex font- text-lg">
      {[
        { label: "Mattress", href: "/product/category/mattress" },
        { label: "Pillow", href: "/product/category/pillow" },
        { label: "Cushion", href: "/product/category/cushion" },
        { label: "Bolster", href: "/product/category/bolster" },
        // { label: "Customize product", href: "/" },
      ].map((item, index) => (
        <Link key={index} href={item.href}>
          <p
            onClick={() => handleTabClick(index)}
            className={`mx-3 py-2 px-3 cursor-pointer transition-colors hover:text-customColor hover:border-b-2 hover:border-customColor duration-300 ${
              activeTab === index
                ? "text-customColor border-b-2 border-customColor"
                : "text-black border-b-2 border-transparent hover:text-customColor"
            }`}
          >
            {item.label}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
