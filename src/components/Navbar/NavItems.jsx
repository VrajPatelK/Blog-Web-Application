"use client";

import SignInModal from "../Modals/SignInModal";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Button1 from "../Button/Button1";
//
const activeClass =
  "w-full block py-2 px-3 text-orange-600 bg-white rounded md:bg-transparent md:text-orange-700 md:p-0";
const passiveClass =
  "w-full block py-2 px-3 text-white hover:text-gray-900 rounded hover:bg-gray-100 md:text-black md:hover:bg-transparent md:border-0 md:hover:text-orange-700 md:p-0";

const NavItems = (props) => {
  //
  const pathname = usePathname();
  const isActive = (path) => {
    return pathname === path;
  };
  const session = useSession();
  const status = session?.status;

  if (status === "loading") {
    return;
  }

  const userId = session?.data?.user?._id;

  return (
    <div
      className={"w-full md:w-auto flex " + props.className}
      id="navbar-default"
    >
      <ul className="font-medium flex flex-col md:items-center items-start w-full gap-y-2 py-4 md:p-3 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-orange-50">
        <li onClick={() => props.onPageChange()} className="w-full">
          <Link
            href={"/"}
            className={isActive("/") ? activeClass : passiveClass}
            aria-current="page"
          >
            Home
          </Link>
        </li>
        {status === "unauthenticated" && (
          <li>
            <SignInModal>
              <div
                className="border p-2 shadow-sm rounded text-center md:bg-orange-500 text-white opacity-90"
                aria-current="page"
              >
                Singin
              </div>
            </SignInModal>
          </li>
        )}
        {status === "authenticated" && (
          <>
            <li onClick={() => props.onPageChange()} className="w-full">
              <Link
                href={"/users/" + userId}
                className={
                  isActive("/users/" + userId) ? activeClass : passiveClass
                }
                aria-current="page"
              >
                Profile
              </Link>
            </li>
            <li className="w-full">
              <button
                className="border p-2 shadow-sm rounded text-center md:bg-orange-500 text-white opacity-90"
                aria-current="page"
                onClick={() => signOut("google")}
              >
                Signout
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default NavItems;
