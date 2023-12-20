import Image from "next/image";
import img404 from "../../public/404.png";
import Link from "next/link";
import { RightCircleFilled } from "@ant-design/icons";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import SignInModal from "@/components/Modals/SignInModal";
import Button1 from "@/components/Button/Button1";

const NotFoundPage = async () => {
  //
  const session = await getServerSession(authOptions);

  //
  return (
    <div className="w-fit min-h-96 h-fit flex justify-center items-center flex-col gap-4 bg-orange-200 text-center my-10 mx-auto sm:px-20 px-6 rounded-2xl shadow-2xl">
      <div className="sm:text-2xl text-xl text-orange-500 font-bold mt-16 shadow bg-orange-100 p-3 rounded-full">
        404 : Page Not Found!
      </div>
      <Image
        src={img404}
        width={250}
        height={250}
        alt="404"
        className="filter drop-shadow-2xl mx-auto"
      />
      {session ? (
        <Link
          className="text-lg w-32 text-orange-500 font-bold mt-10 mb-16 flex items-center justify-between gap-x-2 shadow bg-orange-100 p-3 rounded-full"
          href={"/"}
        >
          Home <RightCircleFilled />
        </Link>
      ) : (
        <SignInModal className="text-lg w-32 text-orange-500 font-bold mt-10 mb-16 flex items-center justify-between gap-x-2 shadow bg-orange-100 p-3 rounded-full">
          Sign In <RightCircleFilled />
        </SignInModal>
      )}
    </div>
  );
};

export default NotFoundPage;
