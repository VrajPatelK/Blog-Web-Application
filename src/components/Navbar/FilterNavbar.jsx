"use client";
import React, { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import SearchBar from "../SearchBar/SearchBar";
import { useSearchParams, useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const FilterNavbar = (props) => {
  //
  const { INITIAL_FILTERS, publisherId, userId } = props;

  var base = `${
    process.env.NEXT_PUBLIC_NEXTAUTH_URL || process.env.NEXTAUTH_URL
  }/users/${publisherId}`;
  var searchParams = useSearchParams();
  var router = useRouter();
  const [isAllClear, setIsAllClear] = useState(false);
  const [filters, setAllFilters] = useState(INITIAL_FILTERS);

  //
  function filterHandler(key, selectedValue) {
    props.onFilter(key, selectedValue);
  }

  //
  function filterHandler(key, selectedValue) {
    //
    var currentQuery = searchParams.toString(); // current query
    var newQuery = new URLSearchParams(currentQuery); // new query

    //
    if (newQuery.has("clear")) newQuery.delete("clear");
    if (newQuery.has("query")) newQuery.delete("q");

    if (newQuery.has(key)) newQuery.set(key, selectedValue);
    else newQuery.append(key, selectedValue);

    //
    newQuery = newQuery.toString();
    router.push(`${base}?${newQuery}`);
    toast.success("filtered !");
    setIsAllClear(false);

    // upadte status
    setAllFilters((prevFilters) => {
      var newFilters = prevFilters.map((filter) => {
        if (filter.key === key) {
          filter.selected = selectedValue;
        }
        return filter;
      });

      return newFilters;
    });
  }

  //
  function removeFilterHandler() {
    if (isAllClear) {
      toast.error("all filters are already cleared!");
      return;
    }
    router.push(`${base}?type=all`);
    toast.success("all filters are cleared!");

    // update state
    setIsAllClear(true);
    setAllFilters((prevFilters) => {
      var newFilters = prevFilters.map((filter) => {
        filter.selected = filter.key === "type" ? "all" : "";
        return filter;
      });

      return newFilters;
    });
  }

  //
  return (
    <>
      <Toaster />
      <div className="w-full flex lg:flex-row flex-col-reverse lg:gap-y-0 gap-y-3 justify-between items-start">
        <div className="lg:px-2 flex flex-wrap justify-start gap-3 w-fit">
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
          {publisherId === userId && (
            <div
              className="flex items-center justify-center w-fit px-2 rounded text-orange-500 underline cursor-pointer hover:no-underline"
              onClick={removeFilterHandler}
            >
              clear all filters
            </div>
          )}
        </div>
        <div className="lg:w-fit w-full">
          <SearchBar
            label={"search"}
            btnLable={"search"}
            placeholder={"title ..."}
            baseUrl={`${
              process.env.NEXT_PUBLIC_NEXTAUTH_URL || process.env.NEXTAUTH_URL
            }/users/${publisherId}`}
          />
        </div>
      </div>
    </>
  );
};

export default FilterNavbar;
