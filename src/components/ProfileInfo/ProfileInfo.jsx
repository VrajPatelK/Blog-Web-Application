import Avatar from "antd/es/avatar/avatar";
import Link from "next/link";

const ProfileInfo = (props) => {
  const { userid, shortName, publisherName, publish_date } = props;
  const classes = props.className;

  return (
    <Link
      className={
        "w-fit flex justify-start align-middle cursor-pointer " + classes
      }
      href={`/users/${userid}`}
    >
      <div className="flex mr-2">
        <Avatar
          className="my-auto"
          style={{
            backgroundColor: "#f56a00",
          }}
        >
          {shortName}
        </Avatar>
      </div>
      <div>
        <div className="text-orange-600 text-lg font-medium">
          {publisherName}
        </div>
        <div className="text-gray-500 text-sm">{publish_date}</div>
      </div>
    </Link>
  );
};

export default ProfileInfo;
