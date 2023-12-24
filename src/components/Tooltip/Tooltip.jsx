import React from "react";

const Tooltip = ({
  children,
  bg = "bg-gray-900",
  tc = "text-gray-300",
  display = "md:block hidden",
  className,
}) => {
  return (
    <div
      id="tooltip-left"
      role="tooltip"
      className={
        "h-fit w-fit z-10 px-2 py-0.5 text-sm font-medium text-gray-300 rounded-lg shadow-sm tooltip dark:bg-gray-700 " +
        bg +
        " " +
        tc +
        " " +
        display +
        " " +
        className
      }
    >
      {children}
      <div className="tooltip-arrow" data-popper-arrow></div>
    </div>
  );
};

export default Tooltip;
