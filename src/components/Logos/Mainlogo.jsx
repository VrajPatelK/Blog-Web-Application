import Image from "next/image";
import React from "react";
import logo from "../../../public/blog-logo.png";

const Mainlogo = () => {
  return (
    <div className="md:py-4 py-2 rounded-md text-orange-600 font-bold flex flex-col md:items-center items-start md:w-fit w-fit">
      <div className="w-full flex justify-center items-center">
        <Image
          src={logo}
          width={60}
          height={60}
          className="w-8 h-auto md:hidden"
          alt="logo"
        />
      </div>
      <span className="md:text-xl text-xs md:block tracking-wider">
        || सेवक शिष्य ||
      </span>
      <span className="text-xs mt-3 md:block hidden capitalize">
        The Edge Of threads ...
      </span>
    </div>
  );
};

export default Mainlogo;
