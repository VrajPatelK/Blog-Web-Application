"use client";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import Button1 from "../Button/Button1";
import Button2 from "../Button/Button2";
import { HeartOutlined, PlusOutlined } from "@ant-design/icons";
import Badge from "../Badge/Badge";
import BadgeWrapper from "../BadgeWrapper/BadgeWrapper";
import moment from "moment";
import Container from "@/layouts/Container";
import Screen from "../Screen/Screen";

import { useSession } from "next-auth/react";
import FollowBtn from "../Button/FollowBtn";
import LikeBtn from "../Button/LikeBtn";

const SpecificBlog = (props) => {
  const { article } = props;

  //
  const { _id, title, description, tags, publisher, createdAt } = article;
  const formatedDate = moment(createdAt).format("MMMM D, YYYY");

  const session = useSession();
  if (session.status === "loading") return;

  const userId = session?.data?.user?._id;
  const publisherId = publisher?._id;

  return (
    <>
      <Screen bg="bg-gray-900">
        <div className="sm:w-10/12 w-full sm:px-0 mx-auto">
          <div className="mx-auto text-white text-start font-bold text-2xl sm:text-4xl">
            {title}
          </div>
          <div className="mt-5 flex flex-col lg:flex-row">
            <ProfileInfo
              shortName={publisher.username.toUpperCase().substr(0, 2)}
              publisherName={publisher.username}
              publish_date={formatedDate}
              userid={publisher._id}
              imgUrl={publisher?.imgUrl}
            />
            <div className="flex flex-col md:flex-row gap-x-2 lg:mt-0 lg:ml-auto lg:mr-0 mr-auto ml-0 mt-5">
              {/* <Button2 className="mt-2 md:mt-0">
                  <PlusOutlined /> Follow {publisher.username}
                </Button2> */}

              <FollowBtn
                userId={userId}
                publisherId={publisherId}
                labelVisible={false}
              />
              <LikeBtn articleId={_id} userId={userId}>
                Favourite Articles
              </LikeBtn>
            </div>
          </div>
        </div>
      </Screen>
      {/* body */}
      <Container>
        <div className="w-full md:p-10 p-5 mx-auto bg-orange-50 mt-3 mb-5 rounded-xl shadow-md font-medium text-orange-800">
          <div className="sm:text-lg xs:text-base text-justify">
            {description}
          </div>
          <BadgeWrapper className="mt-5">
            {tags.map((tag, index) => (
              <Badge key={index}>{tag}</Badge>
            ))}
          </BadgeWrapper>
          {!session ? (
            <div className="text-center mt-5">
              <a className="text-orange-500" href="/signin">
                Sign In
              </a>
              &nbsp;or&nbsp;
              <a className="text-orange-500" href="/signup">
                Sign Up
              </a>
              &nbsp;to add comments on this article.
            </div>
          ) : (
            <div> {/*Add Comment*/}</div>
          )}
        </div>
      </Container>
    </>
  );
};

export default SpecificBlog;
