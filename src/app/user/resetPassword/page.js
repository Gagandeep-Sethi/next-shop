import ResetPassword from "@/app/(components)/ResetPasswoord";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div>
      <Suspense>
        <ResetPassword />
      </Suspense>
    </div>
  );
};

export default page;
