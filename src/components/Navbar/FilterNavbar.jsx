"use client";
import React from "react";
import { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";

const FilterNavbar = (props) => {
  //
  const { filters, publisherId, userId } = props;
  const [filterVisible, setFilterVisible] = useState(false);
  const [tooltip, setTooltip] = useState(false);

  //
  function filterHandler(key, selectedValue) {
    props.onFilter(key, selectedValue);
  }

  //
  return (
    <div className="w-full bg-transparent">
      <div id="accordion-collapse" data-accordion="collapse">
        <h2
          id="accordion-collapse-heading-1"
          className="shadow-xl bg-[#ffab5db2]"
          style={{
            background: "#FFBF7A",
            background: "radial-gradient(at center, #FFBF7A, #7B3B01)",
          }}
        >
          <button
            type="button"
            className="flex items-center justify-between w-full p-5 font-bold rtl:text-right text-white rounded-t-xl gap-3"
            // hover:bg-[#CF8A46]
            data-accordion-target="#accordion-collapse-body-1"
            aria-expanded="true"
            aria-controls="accordion-collapse-body-1"
            onClick={() => setFilterVisible((prev) => !prev)}
          >
            <span className="flex justify-center items-center">
              Filter &nbsp;
              <svg
                className="w-4 h-4 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18.85 1.1A1.99 1.99 0 0 0 17.063 0H2.937a2 2 0 0 0-1.566 3.242L6.99 9.868 7 14a1 1 0 0 0 .4.8l4 3A1 1 0 0 0 13 17l.01-7.134 5.66-6.676a1.99 1.99 0 0 0 .18-2.09Z" />
              </svg>
            </span>
            <div className="flex items-center justify-center gap-x-2">
              {publisherId === userId && (
                <>
                  {tooltip && (
                    <div
                      id="tooltip-left"
                      role="tooltip"
                      className="md:block hidden z-10 px-2 py-0.5 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700"
                    >
                      clear all filters
                      <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                  )}

                  <div
                    className="outline-none border-none w-fit h-fit"
                    onClick={() => props.onRemoveFilter(["status", "privacy"])}
                    onMouseEnter={() => setTooltip((prev) => !prev)}
                    onMouseLeave={() => setTooltip((prev) => !prev)}
                  >
                    <svg
                      className="w-5 h-5 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 18"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m2.133 2.6 5.856 6.9L8 14l4 3 .011-7.5 5.856-6.9a1 1 0 0 0-.804-1.6H2.937a1 1 0 0 0-.804 1.6Z"
                      />
                    </svg>
                  </div>
                </>
              )}
            </div>
          </button>
        </h2>
        {filterVisible && (
          <div
            id="accordion-collapse-body-1"
            aria-labelledby="accordion-collapse-heading-1"
            className="bg-orange-50"
            // style={{
            //   background: "linear-gradient(135deg, #FFD77D, #FFA500)",
            //   background: "none",
            // }}
          >
            <div className="p-5 dark:border-gray-700 dark:bg-gray-900 flex flex-wrap justify-start gap-5">
              {filters.map((filter, index) => {
                return (
                  <Dropdown
                    key={index}
                    onSelect={(selectedValue) =>
                      filterHandler(filter.key, selectedValue)
                    }
                    title={filter.title}
                    items={filter.items}
                    selected={filter.selected}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterNavbar;
