import { openGraphImage } from "@/app/shared-metadata";
import Profile from "@/components/Profile/Profile";
import { getArticles, getUser } from "@/Helpers/callers";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/dist/server/api-utils";

export default async function ProfilePage({ params, searchParams }) {
  //
  const session = await getServerSession(authOptions);
  const userId = session?.user?._id;
  const publisherId = params?.userId;
  var articlesUrl = `/users/${publisherId}/articles?type=all&status=published&privacy=public`;

  if (searchParams.query?.trim()?.length > 0) {
    articlesUrl = `/users/${publisherId}/articles?query=${searchParams.query}`;
  }
  if (searchParams.status || searchParams.privacy || searchParams.type) {
    if (
      (searchParams.privacy || searchParams.status) &&
      publisherId !== userId
    ) {
      articlesUrl = `/users/${publisherId}/articles?type=undefined`;
    } else {
      var filterStr = new URLSearchParams(searchParams);
      filterStr.append("status", "published");
      filterStr.append("privacy", "public");
      filterStr.toString();
      articlesUrl = `/users/${publisherId}/articles?${filterStr}`;
    }
  }

  // api calling
  const userData = await getUser(`/${publisherId}`);
  const articleData = await getArticles(articlesUrl);

  //
  return (
    <Profile
      userData={userData}
      articleData={articleData}
      apiEndPoint={`/users/${publisherId}/articles?type=all&status=published&privacy=public`}
    />
  );
}

export async function generateMetadata({ params, searchParams }, parent) {
  const id = params.userId;
  const { message: user } = await getUser(`/${id}`);
  // const { message: articles } = await getArticles(`/${id}`);

  var description = [user._id, user.username, user.email];
  description = description.concat(openGraphImage.description);

  return {
    title: `${user.username} - || सेवक शिष्य || - The edge of threads`,
    description: [user._id, user.username, user.email],
  };
}
