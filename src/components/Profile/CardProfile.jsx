"use client";
import React, { useState, useEffect } from "react";
import CreateArticleModal from "../Modals/CreateArticleModal";
import EditProfileModal from "../Modals/EditProfileModal";
import Button1 from "../Button/Button1";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import Toast from "../Toast/Toast";
import Loader from "../Loaders/Loader";
import FollowBtn from "../Button/FollowBtn";
import Avatar from "antd/es/avatar/avatar";

const CardProfile = ({ userId, role, publisher }) => {
  //

  const [dorpdown, setDropdown] = useState(false);
  const [error, setError] = useState(undefined);
  const [loader, setLoader] = useState(true);

  //
  if (error) return <Toast message={error} type="loading" />;
  if (!publisher && loader) return <Loader />;

  var bg = publisher?.imgUrl ? "" : "bg-orange-200 bg-opacity-50";
  //
  const publisherId = publisher?._id;

  //
  return (
    <div className="w-full bg-orange-50 bg-opacity-60 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center pb-10 pt-10">
        <img
          width={50}
          height={50}
          className={"w-24 h-24 mb-3 rounded-full shadow-lg " + bg}
          src={publisher?.imgUrl || process.env.NEXT_PUBLIC_PROFILE_URL}
          alt={publisher?.username}
        />
        <h5 className="mb-1 text-lg font-medium text-gray-700 dark:text-white text-center">
          {publisher?.username}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400 text-center">
          {publisher?.email}
        </span>
        <div className="mt-5">
          <FollowBtn userId={userId} publisherId={publisherId}></FollowBtn>
        </div>
        {publisherId === userId && role === "admin" && (
          <div className="flex gap-3 mt-3">
            <div>
              <CreateArticleModal>
                <Button1 className="sm:mt-2 md:mt-0 bg-orange-50 shadow-lg">
                  <PlusOutlined /> Articles
                </Button1>
              </CreateArticleModal>
            </div>
            <div>
              <EditProfileModal user={publisher}>
                <Button1 className="sm:mt-2 md:mt-0 bg-orange-50 shadow-lg">
                  <EditOutlined /> Profile
                </Button1>
              </EditProfileModal>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardProfile;