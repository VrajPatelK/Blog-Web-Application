import React from "react";

const Button1 = (props) => {
  const classes = props.className;

  return (
    <div
      className={
        "border border-orange-400 text-orange-500 w-fit h-fit py-1 px-3 my-auto rounded cursor-pointer hover:text-white hover:bg-orange-500 " +
        classes
      }
    >
      {props.children}
    </div>
  );
};

export default Button1;
