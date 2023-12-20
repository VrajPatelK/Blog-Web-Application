"use client";

import { SessionProvider } from "next-auth/react";

const NextSessionProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextSessionProvider;
