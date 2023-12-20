import React from "react";
import { Spin } from "antd";
const Loader = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 10,
      }}
    >
      <Spin size="large" className="text-orange-600" />
    </div>
  );
};

export default Loader;
