import Container from "@/layouts/Container";
import CardContainer from "../CardContainer/CardContainer";
import InfoAlert from "../Alerts/InfoAlert";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Toast from "../Toast/Toast";

// caller
import CardProfile from "./CardProfile";

const Profile = async (props) => {
  const { userData, articleData } = props;
  //
  var publisher = userData.message;
  if (userData.status !== 200)
    return <Toast message={userData.message} type="loading" />;

  //
  const session = await getServerSession(authOptions);
  const userId = session?.user?._id;
  const role = session?.user?.role;
  const publisherId = publisher?._id;

  //
  return (
    <div className=" border-black">
      <Container>
        <div className="w-full flex md:flex-row flex-col md:gap-x-3 md:gap-y-0 gap-y-3">
          {/* profile card */}
          <div className="lg:w-1/4 md:w-1/3 w-full border-black">
            <CardProfile publisher={publisher} userId={userId} role={role} />{" "}
          </div>

          {/* body */}
          <div className="lg:w-3/4 md:w-2/3 w-full border-black">
            <CardContainer
              articleData={articleData}
              navBarDisplay={true}
              publisherId={publisherId}
              userId={userId}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Profile;

{
  /*
  <Container>
              <div className=" border-black grid xl:grid-cols-1">
                <div className="grid sm:grid-cols-2 gap-2 py-3 px-2 rounded-lg border bg-black bg-opacity-10 shadow-sm border-[#F2EADC]">
                  <div className="px-4 border-gray-100 flex gap-x-2 justify-between items-end h-fit w-fit">
                    <div className="w-44 h-fit">
                      <img
                        src={publisher?.imgUrl ? publisher?.imgUrl : profilebg}
                        // src={
                        //   "https://cdn.pixabay.com/photo/2023/02/19/08/39/man-7799486_960_720.jpg"
                        // }
                        className="shadow-2xl w-full rounded-full"
                        width={60}
                        height={50}
                        alt={
                          publisher?.username ? publisher?.username : "profile"
                        }
                      />
                    </div>
                    <div className="flex justify-center font-semibold sm:text-xl text-lg text-white h-fit">
                      {publisher?.username}
                    </div>
                  </div>
                  <div
                    className={
                      "grid border-gray-800 sm:px-4 px-0 h-fit " + gridRows
                    }
                  >
                    <FollowBtn
                      userId={userId}
                      publisherId={publisherId}
                    ></FollowBtn>

                    {publisherId === userId && role === "admin" && (
                      <div className="grid grid-cols-2">
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
                <div></div>
              </div>
            </Container>


*/
}
