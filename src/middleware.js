import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublic = path === "/user/login" || path === "/user/signup";
  const account = path === "/user";
  const cart = path === "/cart";

  const token = request.cookies.get("token")?.value || "";

  if (cart && !token) {
    return NextResponse.redirect(new URL("/user/login", request.nextUrl));
  }
  if (isPublic && token) {
    return NextResponse.redirect(new URL("/user", request.nextUrl));
  }
  if (account && !token) {
    return NextResponse.redirect(new URL("/user/login", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/user/login", "/user/signup", "/user", "/cart"],
};
