"use client";

import React, { useEffect, useRef, useState } from "react";

const Description = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayReadBtn, setDisplayReadBtn] = useState(false);

  var paragraphStyle = {
    WebkitLineClamp: 4,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    display: "-webkit-box",
  };

  var paraRef = useRef(null);

  useEffect(() => {
    if (paraRef.current) {
      // console.log(paraRef.current.scrollHeight, paraRef.current.clientHeight);
      setDisplayReadBtn(
        paraRef.current.scrollHeight !== paraRef.current.clientHeight
      );
    }
  }, []);

  return (
    <>
      <p style={isOpen ? null : paragraphStyle} ref={paraRef}>
        {props.children}
      </p>

      {displayReadBtn && (
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="outline-none border-none text-orange-400 bg-orange-100 px-1 mt-2 rounded"
        >
          {isOpen ? "read less..." : "read more..."}
        </button>
      )}
    </>
  );
};

export default Description;
