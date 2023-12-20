import Container from "@/layouts/Container";
import React from "react";

const Screen = (props) => {
  var bg = props.bg || "bg-orange-500";

  var style =
    bg === "bg-orange-500"
      ? {
          background: "#FF5D6F",
          background: "linear-gradient(135deg, #FF5D6F, #FF7201)",
        }
      : {};

  return (
    <Container>
      <div
        className={"py-12 rounded-lg shadow-lg sm:px-0 px-5 " + bg}
        style={style}
      >
        {props.children}
      </div>
    </Container>
  );
};

export default Screen;
