"use client";

import React from "react";
import { useState } from "react";

const Dropdown = (props) => {
  //
  const { title, items } = props;

  const [displayDropbox, setDisplayDropbox] = useState(false);
  const [selected, setSelected] = useState(props.selected || undefined);

  const activeClass =
    "block px-4 py-2 hover:bg-gray-100 bg-gray-200 capitalize cursor-pointer";
  const passiveClass =
    "block px-4 py-2 hover:bg-gray-100 capitalize cursor-pointer";

  //
  function selectHandler(selected) {
    setSelected(selected);
    setDisplayDropbox(false);

    props.onSelect(selected);
  }

  return (
    <div
      onMouseEnter={() => setDisplayDropbox((prev) => !prev)}
      onMouseLeave={() => setDisplayDropbox((prev) => !prev)}
    >
      <button
        id="dropdownHoverButton"
        data-dropdown-toggle="dropdownHover"
        data-dropdown-trigger="hover"
        className="text-white w-fit bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
        type="button"
        onClick={() => setDisplayDropbox((prev) => !prev)}
      >
        {title}{" "}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {displayDropbox && (
        <div
          id="dropdownHover"
          className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownHoverButton"
          >
            {items.map((item, index) => {
              return (
                <li
                  key={item}
                  onClick={() => selectHandler(item)}
                  className={item === selected ? activeClass : passiveClass}
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
