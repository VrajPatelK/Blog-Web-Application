import { openGraphImage } from "@/app/shared-metadata";
import Profile from "@/components/Profile/Profile";
import { getArticles, getUser } from "@/Helpers/callers";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export default async function ProfilePage({ params, searchParams }) {
  //
  const session = await getServerSession(authOptions);
  const userId = session?.user?._id;
  const publisherId = params?.userId;
  var articlesUrl =
    userId === publisherId
      ? `/users/${publisherId}/articles?type=all`
      : `/users/${publisherId}/articles?type=all&status=published&privacy=public`;
  var filterStr = new URLSearchParams(searchParams);

  if (searchParams?.query?.trim().length > 0) {
    articlesUrl = `/users/${publisherId}/articles?query=${searchParams?.query}`;
  } else if (
    publisherId !== userId &&
    ((filterStr.has("status") && filterStr.get("status") !== "published") ||
      (filterStr.has("privacy") && filterStr.get("privacy") !== "public"))
  ) {
    articlesUrl = `/users/${publisherId}/articles?type=undefined`;
  } else {
    if (publisherId === userId)
      articlesUrl = `/users/${publisherId}/articles?${filterStr.toString()}`;
  }

  //
  const userData = await getUser(`/${publisherId}`);
  const articleData = await getArticles(articlesUrl);

  //
  return <Profile userData={userData} articleData={articleData} />;
}

export async function generateMetadata({ params, searchParams }, parent) {
  const id = params.userId;
  const { message: user } = await getUser(`/${id}`);

  var description = [user._id, user.username, user.email];
  description = description.concat(openGraphImage.description);

  return {
    title: `${user.username} - || सेवक शिष्य || - The edge of threads`,
    description: [user._id, user.username, user.email],
  };
}
