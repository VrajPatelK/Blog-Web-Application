"use client";
import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast, { Toaster } from "react-hot-toast";

const CopyButton = (props) => {
  const [copied, setCopied] = useState(false);

  function copyHandler() {
    setCopied(true);
    toast.success("copied !");
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  const btnContent = copied ? (
    <svg
      className="w-4 h-4"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 12"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M1 5.917 5.724 10.5 15 1.5"
      />
    </svg>
  ) : (
    <svg
      className="w-4 h-4"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 19 19"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M11.013 7.962a3.519 3.519 0 0 0-4.975 0l-3.554 3.554a3.518 3.518 0 0 0 4.975 4.975l.461-.46m-.461-4.515a3.518 3.518 0 0 0 4.975 0l3.553-3.554a3.518 3.518 0 0 0-4.974-4.975L10.3 3.7"
      />
    </svg>
  );

  const bgColor = copied
    ? "bg-orange-400 text-white"
    : "text-orange-400 border-orange-400";
  return (
    <div>
      <Toaster />
      <CopyToClipboard text={props.text}>
        <button
          type="button"
          onClick={copyHandler}
          className={"border rounded-md p-2 " + bgColor}
        >
          {btnContent}
        </button>
      </CopyToClipboard>
    </div>
  );
};

export default CopyButton;
