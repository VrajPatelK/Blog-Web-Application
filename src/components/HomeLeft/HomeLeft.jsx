import { Divider } from "antd";

import BadgeWrapper from "../BadgeWrapper/BadgeWrapper";
import Badge from "../Badge/Badge";
import { getPopularTags } from "@/Helpers/Helpers";
import InfoAlert from "../Alerts/InfoAlert";

const HomeLeft = (props) => {
  //
  const classes = props.className;

  // const { tags, uniqueTags, tagCountMap } = props.badges; // --> you can acces 3 things
  const { tagCountMap } = props.badges;
  const tagCountMapUpdated = getPopularTags(tagCountMap); // return object
  let popularTags = [];

  let index = 0;
  for (const key in tagCountMapUpdated) {
    // console.log(`${key}: ${tagCountMapUpdated[key]}`); // you get this
    popularTags.push(<Badge key={index++}>{key}</Badge>); //
  }
  if (popularTags.length === 0) return;

  //
  return (
    <>
      <div
        className={
          "sm:w-[25%] w-full px-4 pt-3 pb-5 h-fit rounded-lg mt-5 mx-auto " +
          classes
        }
        style={{
          boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
        }}
      >
        <div className="font-medium text-lg text-orange-500">Poupular Tags</div>
        <Divider />
        {popularTags.length > 0 && <BadgeWrapper>{popularTags}</BadgeWrapper>}
      </div>
    </>
  );
};

export default HomeLeft;
