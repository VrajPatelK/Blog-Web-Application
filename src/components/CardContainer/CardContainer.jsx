"use client";
import { useEffect, useState } from "react";
import Card from "../Card/Card";
import { getArticles } from "@/Helpers/callers";
import Toast from "../Toast/Toast";
import Loader from "../Loaders/Loader";
import FilterNavbar from "../Navbar/FilterNavbar";
import toast, { Toaster } from "react-hot-toast";
import InfoAlert from "../Alerts/InfoAlert";

function getFilterSearchQueryUrl(arr = []) {
  var url = "";

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].selected) {
      if (i == 0) url += "?";
      else url += "&";
      url += `${arr[i].key}=${arr[i].selected}`;
    }
  }

  return url;
}

const CardContainer = (props) => {
  //
  const {
    apiEndPoint,
    navBarDisplay = false,
    publisherId = "",
    userId = "",
  } = props;

  const INITIAL_FILTER = [
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
      items: publisherId === userId ? ["published", "pending"] : ["published"],
    },
    {
      key: "privacy",
      selected: "public",
      title: "Privacy",
      items: publisherId === userId ? ["public", "private"] : ["public"],
    },
  ];

  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(undefined);
  const [loader, setLoader] = useState(true);
  const [filters, setFilters] = useState(INITIAL_FILTER);

  //
  function filterHandler(key, selectedValue) {
    var newFilters = filters.map((filter) => {
      if (filter.key === key) filter.selected = selectedValue;
      return filter;
    });
    setFilters(newFilters);

    var searchQuery = getFilterSearchQueryUrl(newFilters);
    fetchArticles(`/users/${publisherId}/articles${searchQuery}`, {
      is: true,
      message: "filtered !",
    });
  }

  //
  function removeFilterHandler(targetFilters) {
    if (!filters[1].selected && !filters[2].selected) {
      toast.success("filter already cleared !");
      return;
    }

    var newFilters = filters.map((filter) => {
      if (targetFilters.includes(filter.key)) filter.selected = undefined;
      return filter;
    });

    setFilters(newFilters);

    var searchQuery = getFilterSearchQueryUrl(newFilters);
    fetchArticles(`/users/${publisherId}/articles${searchQuery}`, {
      is: true,
      message: "cleared all filters !",
    });
  }

  //
  function fetchArticles(apiEndPoint, filter = { is: false, message: "" }) {
    getArticles(apiEndPoint).then((response) => {
      const { message, status } = response;
      if (status !== 200) {
        setError(response.message);
        setLoader(false);
        toast.error(response.message);
        return;
      }
      setArticles(message);
      filter.is && toast.success(filter.message);
      setLoader(false);
    });
  }

  //
  useEffect(() => {
    fetchArticles(apiEndPoint);
  }, []);

  if (error) return <Toast message={error} type="loading" />;
  if (articles.length === 0 && loader) return <Loader />;

  //
  return (
    <>
      <Toaster />
      {navBarDisplay && (
        <div className="shadow overflow-auto border rounded-xl mb-10 mt-5 mx-auto flex justify-between items-center">
          {/* NavBar */}
          <FilterNavbar
            onFilter={filterHandler}
            onRemoveFilter={removeFilterHandler}
            publisherId={publisherId}
            userId={userId}
            filters={filters}
          />
        </div>
      )}
      <div className="w-full px-0.5 sm:px-0 mx-auto mt-5">
        {articles.length === 0 ? (
          <div className="w-full flex justify-center items-center">
            <InfoAlert>not found 🥱 | Change Filter Options</InfoAlert>
          </div>
        ) : (
          articles.map((article, index) => (
            <Card key={index} article={article} />
          ))
        )}
      </div>
    </>
  );
};

export default CardContainer;
