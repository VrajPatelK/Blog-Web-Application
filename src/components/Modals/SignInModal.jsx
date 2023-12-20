"use client";

import GoogleBtn from "../SignIn/SignIn";
import { useState } from "react";

const SignInModal = (props) => {
  //
  const [displayModal, setDisplayModal] = useState(false);
  const { className, children } = props;

  //
  return (
    <>
      {/* caller btn */}
      <div>
        <button className={className} onClick={() => setDisplayModal(true)}>
          {children}
        </button>
      </div>

      {/* modal */}
      {displayModal && (
        <div
          id="popup-modal"
          tabIndex="-1"
          className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative md:p-4 p-2 w-full max-w-md max-h-full md:mb-auto md:ml-auto">
            <div className="relative bg-blue-600 rounded-lg shadow-2xl">
              <button
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                data-modal-hide="popup-modal"
                onClick={() => setDisplayModal(false)}
              >
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
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <span className="text-2xl text-white">Signin</span>
                <h3 className="mb-5 text-lg font-normal lowercase text-gray-300">
                  the edge of threads ...
                </h3>
                <div className="w-fit mx-auto">
                  <GoogleBtn />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignInModal;
