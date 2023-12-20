import React from "react";

const Button2 = (props) => {
  const classes = props.className;

  return (
    <div
      className={
        "border border-white text-white w-fit h-fit py-1 px-3 my-auto rounded cursor-pointer hover:text-white hover:bg-gray-500 " +
        classes
      }
    >
      {props.children}
    </div>
  );
};

export default Button2;
