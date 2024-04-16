import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublic = path === "/user/login" || path === "/user/signup";
  const account = path === "/user";

  const token = request.cookies.get("token")?.value || "";

  if (isPublic && token) {
    console.log("req coming for login");
    return NextResponse.redirect(new URL("/user", request.nextUrl));
  }
  if (account && !token) {
    console.log("req coming profile but not present");
    return NextResponse.redirect(new URL("/user/login", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/user/login", "/user/signup", "/user"],
};
