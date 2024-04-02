"use client";

import UpdateProduct from "@/app/(components)/UpdateProduct";
import React from "react";

const Page = ({ params }) => {
  console.log(params.id);
  return (
    <div>
      <UpdateProduct productId={params.id} />
    </div>
  );
};

export default Page;
