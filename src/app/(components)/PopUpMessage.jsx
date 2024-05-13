"use client";
import React, { useEffect } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { MdError } from "react-icons/md";

const PopUpMessage = ({ message, status, setShowPopup, timeout = 2000 }) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowPopup(false);
    }, timeout);

    return () => clearTimeout(timeoutId);
  }, [setShowPopup, timeout]);

  return (
    <div>
      {status === "success" ? (
        <div role="alert" className="alert alert-success">
          <FiCheckCircle />

          <span>{message}</span>
        </div>
      ) : null}
      {status === "fail" ? (
        <div role="alert" className="alert alert-error">
          <MdError />

          <span>{message}</span>
        </div>
      ) : null}
    </div>
  );
};

export default PopUpMessage;
