"use client";

import image500 from "../../public/500.png";
import Image from "next/image";

const errorPage = ({ error, reset }) => {
  return (
    <div className="w-11/12 min-h-96 h-fit flex justify-center items-center flex-col gap-4 bg-red-50 text-center my-10 mx-auto sm:px-20 px-6 rounded-2xl shadow-2xl">
      <div className="sm:text-2xl text-xl text-red-500 font-bold mt-16 shadow bg-red-100 p-3 md:rounded-full rounded-md">
        {error.name} :{error.message}
      </div>
      <Image
        src={image500}
        width={250}
        height={250}
        alt="404"
        className="filter drop-shadow-2xl mx-auto"
      />
      <button
        className="text-lg w-32 text-red-500 font-bold mt-10 mb-16 flex items-center justify-center gap-x-2 shadow bg-red-100 p-3 rounded-full"
        onClick={reset}
      >
        Try Again
      </button>
    </div>
  );
};

export default errorPage;
