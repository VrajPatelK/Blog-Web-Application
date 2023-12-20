import Link from "next/link";
import Description from "../Description/Description";

const CardBody = (props) => {
  //
  const { articleid, title, description } = props;

  //
  return (
    <div className="pb-2 px-2">
      <div className="sm-py-0 py-2">
        <Link
          className="sm:text-xl text-lg font-semibold text-orange-400 cursor-pointer"
          href={`/blogs/${articleid}`}
        >
          {title}
        </Link>
      </div>
      <div className="mt-1 sm:text-md text-sm text-gray-400 text-justify">
        <Description>{description}</Description>
      </div>
    </div>
  );
};

export default CardBody;
