import React from "react";

const Heading4 = (props) => {
  const classes = props.className;
  return (
    <div className={classes + " font-bold sm:text-3xl text-2xl"}>
      {props.children}
    </div>
  );
};

export default Heading4;
