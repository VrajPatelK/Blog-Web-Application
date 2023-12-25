"use client";
import { useState } from "react";
import NavItems from "./NavItems";
import Link from "next/link";
import NavBarModal from "../Modals/NavBarModal";
import { useSession } from "next-auth/react";
import Mainlogo from "../Logos/Mainlogo";

const MainNavbar = () => {
  //
  const [displayNavbar, setDisplayNavbar] = useState(false);
  const session = useSession();
  // console.log(session);

  return (
    <div>
      <nav>
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto relative">
          <Link
            href={`${process.env.NEXT_PUBLIC_NEXTAUTH_URL || null}`}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Mainlogo />
          </Link>

          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-default"
            aria-expanded="false"
            onClick={() => setDisplayNavbar(true)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          <NavItems
            className="md:block hidden"
            onPageChange={() => setDisplayNavbar(false)}
          />
          {displayNavbar && (
            <NavBarModal
              className={`block md:hidden`}
              onCloseModal={() => setDisplayNavbar(false)}
            />
          )}
        </div>
      </nav>
    </div>
  );
};

export default MainNavbar;
