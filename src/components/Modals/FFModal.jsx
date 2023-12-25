"use client";
import { useState } from "react";
import YellowBadge from "../Badge/YellowBadge";
import profileBg from "../../../public/profile-bg.png";
import Image from "next/image";
import Link from "next/link";

const FFModal = (props) => {
  //
  const [displayModal, setDisplayModal] = useState(false);
  const { className, children, title, data } = props;

  var bodyContent;
  var totalFollows = data?.length;

  if (data.length > 0) {
    bodyContent = data?.map((record) => {
      var imageUrl =
        record?.follower?.imgUrl || record?.following?.imgUrl || profileBg;
      var username = record?.follower?.username || record?.following?.username;
      var email = record?.follower?.email || record?.following?.email;
      var id =
        title === "followers" ? record?.follower?._id : record?.following?._id;

      return (
        <div
          className="flex hover:bg-gray-700 hover:shadow-md py-3 sm:py-4 px-3 hover:rounded-md"
          key={record?._id}
        >
          <Link href={`/users/${id}`}>
            <li>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Image
                    className="w-8 h-8 rounded-full"
                    width={50}
                    height={50}
                    src={imageUrl}
                    alt={username}
                  />
                </div>
                <div className="flex-1 min-w-0 ms-4">
                  <p className="sm:text-sm text-xs font-medium truncate text-white">
                    {username}
                  </p>
                  <p className="sm:text-sm text-xs truncate text-gray-400">
                    {email}
                  </p>
                </div>
              </div>
            </li>
          </Link>
          <button
            type="button"
            className="border-none outline-none ml-auto sm:text-sm text-xs bg-gray-900 text-red-400 p-2 my-auto rounded shadow-md"
            onClick={() => {
              props.onRemoveff(record?._id);
            }}
          >
            remove
          </button>
        </div>
      );
    });
  } else {
    bodyContent = (
      <div className="text-center">
        <YellowBadge className="p-2">
          {totalFollows} {title}
        </YellowBadge>
      </div>
    );
  }
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
          id="crud-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden fixed top-0 mt-24 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-2 w-full max-w-lg max-h-full m-auto">
            {/* <!-- Modal content --> */}
            <div className="relative bg-gray-900 rounded-lg shadow-2xl">
              {/* <!-- Modal header --> */}

              {/* <!-- Modal body --> */}
              <div className="w-full p-4 rounded-lg shadow sm:py-8 px-5 bg-gray-800 border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h5 className="md:text-xl sm:text-lg text-base font-bold leading-none text-white capitalize flex gap-x-3 items-center">
                    {title}{" "}
                    {totalFollows > 0 && (
                      <YellowBadge>{totalFollows}</YellowBadge>
                    )}
                  </h5>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-900 hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                    data-modal-toggle="crud-modal"
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
                </div>
                <div className="flow-root max-h-96 md:max-h-[400px] overflow-y-auto">
                  <ul role="list" className="divide-y divide-gray-700 grid">
                    {bodyContent}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FFModal;
