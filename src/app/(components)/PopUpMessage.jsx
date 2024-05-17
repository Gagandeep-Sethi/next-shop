"use client";

import React, { useEffect } from "react";
import PropTypes from "prop-types";
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

PopUpMessage.propTypes = {
  message: PropTypes.string.isRequired,
  status: PropTypes.oneOf(["success", "fail"]).isRequired,
  setShowPopup: PropTypes.func.isRequired,
  timeout: PropTypes.number,
};

export default PopUpMessage;
