import Container from "@/layouts/Container";
import CardContainer from "../CardContainer/CardContainer";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Toast from "../Toast/Toast";

// caller
import CardProfile from "./CardProfile";

const Profile = async (props) => {
  const { userData, articleData, ADMIN_EMAIL, ADMIN_ROLE } = props;
  //
  var publisher = userData.message;
  if (userData.status !== 200)
    return <Toast message={userData.message} type="loading" />;

  //
  const session = await getServerSession(authOptions);
  const userId = session?.user?._id;
  const role = session?.user?.role;
  const publisherId = publisher?._id;

  var wid =
    publisher?.email === ADMIN_EMAIL ? "lg:w-1/4 md:w-1/3 w-full" : "w-full";
  //
  return (
    <div className=" border-black">
      <Container>
        <div className="w-full flex md:flex-row flex-col md:gap-x-3 md:gap-y-0 gap-y-3">
          {/* profile card */}
          <div className={"border-black " + wid}>
            <CardProfile
              publisher={publisher}
              userId={userId}
              role={role}
              ADMIN_ROLE={ADMIN_ROLE}
            />{" "}
          </div>

          {/* body */}
          {publisher?.email === ADMIN_EMAIL && (
            <div className="lg:w-3/4 md:w-2/3 w-full border-black">
              <CardContainer
                articleData={articleData}
                navBarDisplay={true}
                publisherId={publisherId}
                userId={userId}
              />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Profile;
