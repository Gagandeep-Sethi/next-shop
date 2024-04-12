"use client";
import React from "react";
import { useSelector } from "react-redux";

const Account = () => {
  const user = useSelector((store) => store.user.user);
  console.log(user, "user");

  if (!user) {
    return <p>login again</p>;
  }
  console.log(user.username);

  return (
    <div className="">
      <p className="text-lg font-bold text-center pt-10">
        Hey {user?.username} !
      </p>
      <p className="  text-center pt-10">{user?.email}</p>
      <p className="text-lg  text-center pt-10">{user?.phoneNumber}</p>
      <p className="text-lg  text-center pt-10">Some message</p>
    </div>
  );
};

export default Account;
