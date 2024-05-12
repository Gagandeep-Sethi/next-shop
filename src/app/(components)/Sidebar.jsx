// import Link from "next/link";
// import React from "react";
// import { CiUser } from "react-icons/ci";
// import { useSelector } from "react-redux";

// const Sidebar = () => {
//   const user = useSelector((store) => store?.user?.user);

//   return (
//     <ul className="menu p-4 w-80 min-h-full bg-base-200 space-y-6">
//       {/* Sidebar content here */}
//       <Link
//         className="bg-yellow-500"
//         onClick={() => {
//           document.getElementById("my-drawer-3")?.click();
//         }}
//         href="/user"
//       >
//         <h1 className="flex items-center">
//           <CiUser className="m-2 w-6 h-6 text-black bg-yellow-500" />
//           {user ? "Account" : "SignUp/SignIn"}
//         </h1>
//       </Link>
//       <li aria-label="close sidebar">
//         <Link
//           onClick={() => {
//             document.getElementById("my-drawer-3")?.click();
//           }}
//           href="/product/category/cushion"
//           className="mr-4 transition-colors duration-300 hover:text-customColor"
//         >
//           Cushion
//         </Link>
//       </li>
//       <li aria-label="close sidebar">
//         <Link
//           onClick={() => {
//             document.getElementById("my-drawer-3")?.click();
//           }}
//           href="/product/category/pillow"
//           className="mr-4 transition-colors duration-300 hover:text-customColor"
//         >
//           Pillow
//         </Link>
//       </li>
//       <li aria-label="close sidebar">
//         <Link
//           onClick={() => {
//             document.getElementById("my-drawer-3")?.click();
//           }}
//           href="/product/category/mattress"
//           className="mr-4 transition-colors duration-300 hover:text-customColor"
//         >
//           Mattress
//         </Link>
//       </li>
//       <li aria-label="close sidebar">
//         <Link
//           onClick={() => {
//             document.getElementById("my-drawer-3")?.click();
//           }}
//           href="/product/category/bolster"
//           className="mr-4 transition-colors duration-300 hover:text-customColor"
//         >
//           Bolster
//         </Link>
//       </li>
//       <li aria-label="close sidebar">
//         <Link
//           onClick={() => {
//             document.getElementById("my-drawer-3")?.click();
//           }}
//           href="/"
//           className="mr-4 transition-colors duration-300 hover:text-customColor"
//         >
//           Customize product
//         </Link>
//       </li>
//     </ul>
//   );
// };

// export default Sidebar;
import React from "react";
import { CiUser } from "react-icons/ci";
import { useSelector } from "react-redux";
import Link from "next/link";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { ImCross } from "react-icons/im";

const Sidebar = () => {
  const user = useSelector((store) => store?.user?.user);

  const sidebarItems = [
    { label: "Cushion", href: "/product/category/cushion" },
    { label: "Pillow", href: "/product/category/pillow" },
    { label: "Mattress", href: "/product/category/mattress" },
    { label: "Bolster", href: "/product/category/bolster" },
    // { label: "Customize product", href: "/" },
  ];
  console.log(user, "user");

  return (
    <ul className="menu p-4 w-80 min-h-full bg-white space-y-8">
      <div className="flex justify-end mr-4">
        <ImCross
          onClick={() => {
            document.getElementById("my-drawer-3")?.click();
          }}
          className="w-5 h-5"
        />
      </div>

      {/* Sidebar content here */}
      <Link
        className="bg-orange-500 text-white  text-lg p-2 rounded-xl flex justify-between mb-4 mr-4"
        onClick={() => {
          document.getElementById("my-drawer-3")?.click();
        }}
        href="/user"
      >
        <h1 className="flex items-center">
          <CiUser className=" w-6  h-6 text-white mr-2" />
          {user?.username ? user?.username : "SignUp/SignIn"}
        </h1>
        <MdOutlineKeyboardArrowRight className="w-6 h-6" />
      </Link>
      {sidebarItems.map((item, index) => (
        <li key={index} aria-label="close sidebar ">
          <Link
            onClick={() => {
              document.getElementById("my-drawer-3")?.click();
            }}
            href={item.href}
            className="mr-4 border-b-2 border-l-2   flex justify-between shadow-sm"
          >
            {item.label}
            <MdOutlineKeyboardArrowRight className="w-5 h-5" />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Sidebar;
