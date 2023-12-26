import { NextResponse } from "next/server";

export function middleware(request) {
  const isAuth = () => request.cookies.has("next-auth.session-token");

  if (isAuth()) return NextResponse.next();
  return NextResponse.redirect(new URL("/unauhtorized", request.url));
}

export const config = {
  matcher: ["/users/:path?", "/blogs/:path?"],
};
