import Badge from "../Badge/Badge";
import BadgeWrapper from "../BadgeWrapper/BadgeWrapper";
import ManipulationBtns from "../ManipulationBtns/ManipulationBtns";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const CardFooter = async (props) => {
  //
  const { tags, article } = props;

  const session = await getServerSession(authOptions);

  // const session = useSession();
  // if (session.status === "loading") {
  //   return;
  // }

  const userId = session?.user?._id;

  return (
    <div className="mt-auto">
      <BadgeWrapper className="py-2 px-2 sm:justify-end align-middle justify-center">
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
