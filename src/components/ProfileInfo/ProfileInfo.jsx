import Avatar from "antd/es/avatar/avatar";
import Image from "next/image";
import Link from "next/link";

const ProfileInfo = (props) => {
  const { userid, shortName, publisherName, createdAt, imgUrl } = props;
  const classes = props.className;

  return (
    <Link
      className={
        "w-fit flex justify-start items-center cursor-pointer " + classes
      }
      href={`/users/${userid}`}
    >
      <div className="flex mr-2">
        {!imgUrl && (
          <Avatar
            className="my-auto"
            style={{
              backgroundColor: "#f56a00",
            }}
          >
            {shortName}
          </Avatar>
        )}
        {imgUrl && (
          <Image
            className="my-auto bg-[#f56a00] rounded-full w-10"
            src={imgUrl}
            width={50}
            height={50}
            alt={shortName}
          />
        )}
      </div>
      <div>
        <div className="text-orange-600 sm:text-lg text-base font-medium">
          {publisherName}
        </div>
        <div className="text-gray-500 sm:text-sm text-xs">{createdAt}</div>
      </div>
    </Link>
  );
};

export default ProfileInfo;
