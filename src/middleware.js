import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  //
  const isAuth = () => request.cookies.has("next-auth.session-token");
  const pathname = request.nextUrl.pathname;

  // middleware for pages access
  if (pathname.startsWith("/users") || pathname.startsWith("/blogs")) {
    return isAuth() ? NextResponse.next() : NextResponse.error();
  }

  // middleware for apis access
  if (
    pathname.startsWith("/api/likes") ||
    pathname.startsWith("/api/users") ||
    pathname.startsWith("/api/articles") ||
    pathname.startsWith("/api/articleTags")
  ) {
    var len = pathname.split("/").length;

    if (
      pathname === "/api/articles" ||
      pathname === "/api/articleTags" ||
      (pathname.startsWith("/api/users") && (len === 3 || len === 4))
    ) {
      return NextResponse.next();
    }

    //
    return isAuth() ? NextResponse.next() : NextResponse.error();
  }

  return NextResponse.error();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    //pages
    "/users/:path*",
    "/blogs/:path*",

    // api
    "/api/likes",
    // "/api/users/:path*",
    // "/api/articles/:path*",
  ],
};

// note : (pathname.startsWith("/api/users") && (len === 2 || len === 3)) ==> this is for signin callback and session callback
