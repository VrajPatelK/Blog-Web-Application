import React from "react";
import NavItems from "../Navbar/NavItems";
import Link from "next/link";
import Mainlogo from "../Logos/Mainlogo";

const NavBarModal = (props) => {
  return (
    <div
      id="extralarge-modal"
      tabIndex="-1"
      className={
        "fixed top-0 left-0 right-0 z-50 w-full p-0.5 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full " +
        props.className
      }
    >
      <div className="relative w-full max-w-7xl max-h-full shadow-xl">
        {/* <!-- Modal content --> */}
        <div
          className="relative bg-orange-50 rounded-lg"
          style={{
            background: "#FF0909",
            background: "linear-gradient(0deg, #FF0909, #FF6001)",
          }}
          /*
           * Created with https://www.css-gradient.com
           * Gradient link: https://www.css-gradient.com/?c1=ff0909&c2=ff6001&gt=l&gd=dbb
           */
        >
          {/* <!-- Modal header --> */}
          <div className="flex items-center justify-between p-4 md:p-5 rounded-t">
            <h3 className="text-xl font-bold text-white">|| सेवक शिष्य ||</h3>
            <button
              type="button"
              className="text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              data-modal-hide="extralarge-modal"
              onClick={() => props.onCloseModal()}
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
          </div>

          {/* <!-- Modal body --> */}
          <div className="md:p-5 py-0 px-4 ">
            <NavItems onPageChange={() => props.onCloseModal()} />
          </div>

          {/* <!-- Modal footer --> */}
          <div className="flex items-center p-4 space-x-3 rtl:space-x-reverse border-gray-200 rounded-b">
            <div className="sm:flex sm:items-center sm:justify-between">
              <span className="text-sm text-gray-100 sm:text-center">
                {/* <Link href="http://localhost:3000/" className="hover:underline">
                  || सेवक शिष्य ||™
                </Link> */}
                <br />
                <b>©</b> 2023 All Rights Reserved.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBarModal;
