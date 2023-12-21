"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";

const SearchBar = ({
  placeholder = undefined,
  label = undefined,
  btnLable = undefined,
  publisherId = undefined,
}) => {
  //
  const formRef = useRef(null);
  const [search, setSearch] = useState("");
  const router = useRouter();

  //
  function submitHandler(e) {
    e.preventDefault();
    var formData = new FormData(formRef.current);
    console.log(formData.get("search"));
  }

  //
  return (
    <form onSubmit={submitHandler} ref={formRef}>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-orange-900 sr-only"
      >
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-orange-500 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="text"
          id="search"
          name="search"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          className="block w-full p-4 ps-10 text-base text-orange-500 rounded-lg bg-orange-50 bg-opacity-70 outline-none font-medium"
          placeholder={placeholder}
          required
        />
        <button
          // type="submit"
          type="button"
          className="text-white absolute end-2.5 bottom-2.5 bg-orange-500 hover:bg-orange-800  font-medium rounded-full text-sm p-2 px-4"
          onClick={() => {
            var newUrl = `http://localhost:3000/users/${publisherId}`;

            if (search?.trim().length === 0) {
              router.push(newUrl);
              return;
            }
            newUrl += `?query=${search}`;
            router.push(newUrl);
          }}
        >
          {btnLable}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
