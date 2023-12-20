"use client";

import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

//
const Toast = (props) => {
  useEffect(() => {
    if (props.type === "success") toast.success(props.message);
    else if (props.type === "loading") toast.loading(props.message);
    else if (props.type === "error") toast.error(props.message);
    else if (props.type === "custom") toast.custom(props.message);
  }, []);
  //
  return (
    <>
      <Toaster />
    </>
  );
};

export default Toast;
