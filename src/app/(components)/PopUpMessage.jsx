"use client";
import React, { useEffect } from "react";
import { FiCheckCircle } from "react-icons/fi";

const PopUpMessage = ({ message, setShowPopup }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowPopup(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [setShowPopup]);

  return (
    <div role="alert" className="alert alert-success">
      <FiCheckCircle />

      <span>{message}</span>
    </div>
  );
};

export default PopUpMessage;
