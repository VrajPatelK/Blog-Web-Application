"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import googleIcon from "../../../public/google-icon.svg";

const GoogleBtn = () => {
  //
  async function handleSignIn() {
    signIn("google");
  }

  return (
    <button
      type="button"
      onClick={handleSignIn}
      className="flex items-center py-[2px] pl-[2px] pr-3 rounded-md gap-x-2 w-fit bg-white text-orange-700 font-semibold"
    >
      <Image
        src={googleIcon}
        width={40}
        height={30}
        alt="google"
        className="bg-white p-1 border-e-2"
      />
      Sing in With Google
    </button>
  );
};

export default GoogleBtn;
