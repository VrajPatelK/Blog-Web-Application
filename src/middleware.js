import { NextResponse } from "next/server";

export function middleware(request) {
  const isAuth = () =>
    process.env.NODE_ENV === "production"
      ? request.cookies.has(process.env.GOOGLE_TOKEN_PRODUCTION)
      : request.cookies.has(process.env.GOOGLE_TOKEN_LOCAL);

  if (isAuth()) return NextResponse.next();
  return NextResponse.redirect(new URL("/unauhtorized", request.url));
}

export const config = {
  matcher: ["/users/:path?", "/blogs/:path?"],
};
