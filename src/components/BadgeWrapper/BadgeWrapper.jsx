import React from "react";

const BadgeWrapper = (props) => {
  const classes = props.className ? props.className : "";

  return (
    <div className={"flex flex-wrap gap-y-1 " + classes}>{props.children}</div>
  );
};

export default BadgeWrapper;
