"use client";
import { useState } from "react";
import Card from "../Card/Card";
import Toast from "../Toast/Toast";
import Loader from "../Loaders/Loader";
import FilterNavbar from "../Navbar/FilterNavbar";
import InfoAlert from "../Alerts/InfoAlert";

const CardContainer = (props) => {
  //
  const {
    articleData,
    navBarDisplay = false,
    publisherId = "",
    userId = "",
  } = props;

  const INITIAL_FILTER =
    publisherId === userId
      ? [
          {
            key: "type",
            selected: "all",
            title: "Article Type",
            items: ["all", "recents"],
          },
          {
            key: "status",
            selected: "published",
            title: "Status",
            items: ["published", "pending"],
          },
          {
            key: "privacy",
            selected: "public",
            title: "Privacy",
            items: ["public", "private"],
          },
        ]
      : [
          {
            key: "type",
            selected: "all",
            title: "Article Type",
            items: ["all", "recents"],
          },
        ];

  const [error, setError] = useState(undefined);
  const [loader, setLoader] = useState(true);
  const [filters, setFilters] = useState(INITIAL_FILTER);
  const { message: articles, status } = articleData;

  if (error) return <Toast message={error} type="loading" />;

  //
  return (
    <>
      {navBarDisplay && (
        <div className="overflow-auto rounded-xl mx-auto flex justify-between items-center">
          {/* NavBar */}
          <FilterNavbar
            publisherId={publisherId}
            userId={userId}
            filters={filters}
          />
        </div>
      )}
      <div className="w-full px-0.5 sm:px-0 mx-auto mt-5">
        {!articleData && loader && <Loader />}
        {typeof articles === "string" && (
          <div className="w-full flex justify-center items-center">
            <InfoAlert>not found 🥱</InfoAlert>
          </div>
        )}
        {Array.isArray(articles) &&
          articles.length > 0 &&
          articles.map((article, index) => (
            <Card key={index} article={article} />
          ))}
      </div>
    </>
  );
};

export default CardContainer;
