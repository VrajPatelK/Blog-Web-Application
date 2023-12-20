import Container from "@/layouts/Container";
import Button1 from "../Button/Button1";
import CardContainer from "../CardContainer/CardContainer";
import { PlusOutlined } from "@ant-design/icons";
import CreateArticleModal from "../Modals/CreateArticleModal";
import InfoAlert from "./InfoAlert";
import Image from "next/image";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import FollowBtn from "../Button/FollowBtn";
import profilebg from "../../../public/profile-bg.png";

const Profile = async (props) => {
  //
  const { publisher, articles } = props;
  const session = await getServerSession(authOptions);
  const userId = session?.user?._id;
  const role = session?.user?.role;
  const publisherId = publisher?._id;

  const gridRows = userId === publisherId ? "grid-rows-2 gap-y-2" : "";

  //
  return (
    <div>
      <Container>
        <div className=" border-black grid xl:grid-cols-2">
          <div
            className="grid sm:grid-cols-2 gap-2 border-black py-3 px-2 rounded-lg shadow-xl"
            style={{
              background: "#FF5D6F",
              background: "linear-gradient(135deg, #FF7201, #FF5D6F)",
            }}
          >
            <div className="p-4 rounded-full shadow-md border border-white flex gap-x-2 justify-between items-center">
              <div className="w-fit h-fit">
                <Image
                  src={publisher?.imgUrl ? publisher?.imgUrl : profilebg}
                  className="rounded-full shadow-2xl sm:w-14 w-10"
                  width={60}
                  height={50}
                  alt={publisher?.username ? publisher?.username : "profile"}
                />
              </div>
              <div className="flex justify-center font-semibold sm:text-2xl text-lg text-white">
                {publisher?.username}
              </div>
            </div>
            <div
              className={"grid border-gray-800 sm:px-4 px-0 h-fit " + gridRows}
            >
              <FollowBtn userId={userId} publisherId={publisherId}></FollowBtn>

              {publisher?._id === userId && role === "admin" && (
                <div>
                  <CreateArticleModal>
                    <Button1 className="sm:mt-2 md:mt-0 bg-orange-50 shadow-lg">
                      <PlusOutlined /> Articles
                    </Button1>
                  </CreateArticleModal>
                </div>
              )}
            </div>
          </div>
          <div></div>
        </div>
      </Container>

      {/* body */}
      <Container>
        {articles?.length === 0 ? (
          <div className="mt-10 w-fit mx-auto shadow">
            <InfoAlert>Articles doesn't added yet.</InfoAlert>
          </div>
        ) : (
          <>
            <CardContainer articles={articles} />
          </>
        )}
      </Container>
    </div>
  );
};

export default Profile;
