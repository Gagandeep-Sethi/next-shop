"use client";
import React, { useEffect } from "react";
import { FiCheckCircle } from "react-icons/fi";

const PopUpMessage = ({ message, setShowPopup, timeout = 2000 }) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowPopup(false);
    }, timeout);

    return () => clearTimeout(timeoutId);
  }, [setShowPopup, timeout]);

  return (
    <div role="alert" className="alert alert-success">
      <FiCheckCircle />

      <span>{message}</span>
    </div>
  );
};

export default PopUpMessage;
