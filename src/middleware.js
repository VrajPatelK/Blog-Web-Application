import { NextResponse } from "next/server";

export function middleware(request) {
  const isAuth = () => request.cookies.has("next-auth.session-token");
  const pathname = request.nextUrl.pathname;

  // middleware for pages access
  // if (pathname.startsWith("/users") || pathname.startsWith("/blogs")) {
  //   return isAuth() ? NextResponse.next() : NextResponse.error({ status: 401 });
  // }
  if (isAuth()) {
    NextResponse.next();
  }
}

export const config = {
  matcher: ["/users/:path", "/blogs/:path"],
};
