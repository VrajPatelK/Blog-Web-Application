"use client";

import React, { useEffect, useState } from "react";
import Button1 from "./Button1";
import { CheckCircleFilled, UserAddOutlined } from "@ant-design/icons";
import RedBadge from "../Badge/RedBadge";
import FFLabel from "../FFLabel/FFLabel";

// caller
import {
  getFollowersAndFollwing,
  postFollow,
  deleteFollow,
} from "@/Helpers/callers";
import toast, { Toaster } from "react-hot-toast";

const FollowBtn = ({ userId, publisherId, labelVisible = true }) => {
  //
  const [follows, setFollows] = useState({ followers: [], following: [] });
  const [IsFollowing, setIsFollowing] = useState(false);
  const [error, setError] = useState(undefined);

  //
  function fetchFollows(apiEndPoint) {
    getFollowersAndFollwing(
      `?type=FollowersAndFollowing&id=${publisherId}`
    ).then((response) => {
      //
      if (response.status !== 200) {
        toast.error(response?.message);
        return setError(response);
      } else setFollows(response?.message);
    });
  }

  useEffect(() => {
    fetchFollows(publisherId);
  }, []);

  useEffect(() => {
    getFollowersAndFollwing(
      `?type=isFollowing&id=${userId}&id2=${publisherId}`
    ).then((response) => {
      //
      if (response.status !== 200) {
        toast.error(response?.message);
        return setError(response);
      } else {
        // 0 : not following ; 1 : following
        const IsFollowing = response?.message.length ? true : false;
        setIsFollowing(IsFollowing);
      }
    });
  }, []);

  //
  async function handleFollows() {
    const data = {
      follower: userId,
      following: publisherId,
    };

    if (IsFollowing) {
      const result = await deleteFollow(`?id1=${userId}&id2=${publisherId}`);
      if (result.status !== 200) {
        toast.error(response?.message);
        return setError(result);
      }

      setIsFollowing(false);
      fetchFollows(publisherId);
      toast.success(result.message);

      //
    } else {
      const result = await postFollow(data);
      if (result.status !== 200) {
        toast.error(response?.message);
        return setError(result);
      }

      setIsFollowing(true);
      fetchFollows(publisherId);
      toast.success(result.message);
    }
  }

  async function handleRemoveFF(recordId) {
    const result = await deleteFollow(`?recordId=${recordId}`);
    if (result.status !== 200) {
      toast.error(response?.message);
      return setError(result);
    }
    setIsFollowing(false);
    fetchFollows(publisherId);
    toast.success(result.message);
  }

  //
  return (
    <>
      <Toaster />

      {!error ? (
        <div className="rounded-md grid grid-rows-1 gap-y-2 h-fit">
          {/* flex flex-col lg:items-start items-end justify-between gap-y-12 */}
          {labelVisible && (
            <FFLabel
              followers={follows.followers}
              following={follows.following}
              onRemoveff={handleRemoveFF}
            />
          )}
          {publisherId !== userId && (
            <div className="h-fit border-yellow-500">
              <button
                type="button"
                className="outline-none border-none h-fit w-fit shadow-lg"
                onClick={handleFollows}
              >
                <Button1 className={IsFollowing ? "bg-white" : "bg-orange-50"}>
                  {IsFollowing ? (
                    <>
                      <CheckCircleFilled /> Following
                    </>
                  ) : (
                    <>
                      <UserAddOutlined /> Follow
                    </>
                  )}
                </Button1>
              </button>

              {/* <div className="text-orange-400 my-auto bg-orange-50 p-2 rounded-md shadow-lg border-orange-50 border font-semibold">
            <UserAddOutlined /> Follow
          </div> */}
            </div>
          )}
        </div>
      ) : (
        <RedBadge className="h-fit bg-red-800 text-red-300 shadow-lg">
          Oops!
        </RedBadge>
      )}
    </>
  );
};

export default FollowBtn;
