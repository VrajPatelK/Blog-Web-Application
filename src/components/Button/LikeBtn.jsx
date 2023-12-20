"use client";

import React, { useEffect, useState } from "react";
import Button1 from "./Button1";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import RedBadge from "../Badge/RedBadge";
import toast, { Toaster } from "react-hot-toast";

// callers
import { getLikeArticlesByUser, postLike, deleteLike } from "@/Helpers/callers";

const LikeBtn = ({ articleId, userId, children }) => {
  //
  const [howManyLikes, setHowManyLike] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    getLikeArticlesByUser(`?type=articleIds&id=${articleId}`).then(
      (response) => {
        //
        if (response.status !== 200) setError(response);
        else setHowManyLike(response?.message?.length);
      }
    );
  }, []);

  useEffect(() => {
    getLikeArticlesByUser(`?type=isLiked&id=${articleId}&id2=${userId}`).then(
      (response) => {
        //
        if (response.status !== 200) setError(response);
        else {
          // 0 : not liked ; 1 : liked
          const isLiked = response?.message?.length === 1 ? true : false;
          setIsLiked(isLiked);
        }
      }
    );
  }, []);

  //
  async function handleLikeDislike() {
    const data = {
      article: articleId,
      user: userId,
    };

    if (isLiked) {
      const result = await deleteLike(`?id1=${articleId}&id2=${userId}`);
      if (result.status !== 200) {
        toast.error(result.message);
        return setError(result);
      }

      setIsLiked(false);
      setHowManyLike((prev) => prev - 1);
      toast.success(result.message + " 👎");
    } else {
      const result = await postLike(data);
      if (result.status !== 200) {
        toast.error(result.message);
        return setError(result);
      }

      setIsLiked(true);
      setHowManyLike((prev) => prev + 1);
      toast.success(result.message + " 👍");
    }
  }

  //
  return (
    <>
      <Toaster />
      {!error ? (
        <button
          type="button"
          className="outline-none border-none h-fit w-fit"
          onClick={handleLikeDislike}
        >
          <Button1 className={isLiked && "bg-orange-500 text-white"}>
            {isLiked ? <HeartFilled /> : <HeartOutlined />}
            &nbsp;
            {children ? children + " ( " + howManyLikes + " )" : howManyLikes}
            {/* {howManyLikes} */}
          </Button1>
        </button>
      ) : (
        <RedBadge className="h-fit bg-red-800 text-red-300 shadow-lg">
          Oops!
        </RedBadge>
      )}
    </>
  );
};

export default LikeBtn;
