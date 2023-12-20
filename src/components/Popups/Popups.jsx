"use client";

import { useEffect, useState } from "react";

const Popups = ({ color, children, closeBtnDisplay, time, onClose }) => {
  const [visible, setVisible] = useState(true);
  var btnDisplay = closeBtnDisplay === undefined ? true : closeBtnDisplay;

  useEffect(() => {
    if (time)
      setTimeout(() => {
        setVisible(false);
      }, time * 1000);
  }, []);

  function closeHandler() {
    setVisible(false);
    console.clear();
    if (onClose) {
      onClose();
    }
  }
  return (
    <>
      {visible && (
        <div
          id="alert-1"
          className={`flex items-center z-50 fixed bottom-2 right-2 p-4 mb-4 text-${color}-800 rounded-lg bg-${color}-50 w-fit h-fit my-auto ml-auto lg:mr-2 mr-auto shadow-lg`}
          role="alert"
        >
          <svg
            className="flex-shrink-0 w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div className="ms-3 text-sm font-medium">{children}</div>
          {btnDisplay && (
            <button
              type="button"
              className={`ms-auto -mx-1.5 -my-1.5 bg-${color}-50 text-${color}-500 rounded-lg focus:ring-2 focus:ring-${color}-400 p-1.5 hover:bg-${color}-200 inline-flex items-center justify-center h-8 w-8`}
              data-dismiss-target="#alert-1"
              aria-label="Close"
              onClick={closeHandler}
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Popups;
