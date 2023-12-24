import Badge from "../Badge/Badge";
import BadgeWrapper from "../BadgeWrapper/BadgeWrapper";
import ManipulationBtns from "../ManipulationBtns/ManipulationBtns";
import { useSession } from "next-auth/react";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const CardFooter = (props) => {
  //
  const { tags, article } = props;

  // const session = await getServerSession(authOptions);
  // const userId = session?.user?._id;

  const session = useSession();
  if (session.status === "loading") return;
  const userId = session?.data?.user?._id;

  return (
    <div className="sm:mt-auto mt-5">
      <BadgeWrapper className="py-2 px-2 sm:justify-end items-center justify-start">
        {tags.map((tag, index) => (
          <Badge key={index}>{tag}</Badge>
        ))}
      </BadgeWrapper>

      {article?.publisher?._id === userId && (
        <ManipulationBtns article={article} />
      )}
    </div>
  );
};

export default CardFooter;
