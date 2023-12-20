import ProfileInfo from "../ProfileInfo/ProfileInfo";
import moment from "moment";
import GreenBadge from "../Badge/GreenBadge";
import RedBadge from "../Badge/RedBadge";
import BlueBadge from "../Badge/BlueBadge";
import YellowBadge from "../Badge/YellowBadge";
import LikeBtn from "../Button/LikeBtn";
import { useSession } from "next-auth/react";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import CopyButton from "../Button/CopyButton";
import WhatsappShareBtn from "../Button/WhatsappShareBtn";

const CardHeader = (props) => {
  //
  const { article } = props;
  const formatedDate = moment(article?.createdAt).format("MMMM D, YYYY");

  // const session = await getServerSession(authOptions);
  // const userId = session?.user?._id;

  const session = useSession();
  if (session.status === "loading") return;
  const userId = session?.data?.user?._id;

  //
  // if (!username) {
  //   return (
  //     <>
  //       <div className="py-2 px-2 text-gray-500 text-sm">{formatedDate}</div>
  //       <hr></hr>
  //     </>
  //   );
  // }
  const sharelink = `${process.env.NEXTAUTH_URL}blogs/${article?._id}`;
  const whmsg = `*Blog App* %0a*Title :* ${article?.title}%0a*Author :* ${article?.publisher?.username} %0a*Link :* ${sharelink} %0a`;

  //
  return (
    <div className="px-2 sm:pb-0 pb-2 flex sm:flex-row flex-col justify-between sm:items-center items-start">
      {/* left side */}

      <div className="grid grid-rows-2">
        <ProfileInfo
          shortName={article?.publisher?.username.toUpperCase().substr(0, 2)}
          publisherName={article?.publisher?.username}
          publish_date={formatedDate}
          userid={article?.publisher?._id}
        />

        {/* fav button */}

        <div className="flex sm:justify-center justify-start items-center gap-x-3">
          {article?.status === "published" ? (
            <GreenBadge>{article?.status}</GreenBadge>
          ) : (
            <YellowBadge>{article?.status}</YellowBadge>
          )}
          {article?.privacy === "private" ? (
            <RedBadge>{article?.privacy}</RedBadge>
          ) : (
            <BlueBadge>{article?.privacy}</BlueBadge>
          )}
        </div>
      </div>

      {session && (
        <div className="flex items-center justify-between h-fit gap-x-3">
          <WhatsappShareBtn msg={whmsg} />
          <CopyButton
            text={`${process.env.NEXTAUTH_URL}blogs/${article?._id}`}
          />
          <LikeBtn articleId={article?._id} userId={userId}></LikeBtn>
        </div>
      )}
    </div>
  );
};

export default CardHeader;
