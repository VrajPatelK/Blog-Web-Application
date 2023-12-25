import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  //
  const isAuth = () => request.cookies.has("next-auth.session-token");
  const pathname = request.nextUrl.pathname;

  // middleware for pages access
  if (pathname.startsWith("/users") || pathname.startsWith("/blogs")) {
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
  ],
};
