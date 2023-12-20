import React from "react";

const Badge = (props) => {
  return (
    <div className="bg-orange-50 rounded-2xl flex justify-center w-fit py-1 px-2 text-sm text-orange-500 border border-orange-300 font-medium mr-1">
      {props.children}
    </div>
  );
};

export default Badge;
