import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublic = path === "/user/login" || path === "/user/signup";
  const account = path === "/user" || path === "/user/admin";
  const cart = path === "/cart";
  const updateProduct = /^\/product\/updateproduct\/[^/]+$/;
  const token = request.cookies.get("token")?.value || "";

  // Decode the JWT token to get the payload
  let payload;
  try {
    payload = jwt.decode(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error("Failed to verify token:", error);
  }

  const isTokenExpired =
    payload && payload.exp && Date.now() >= payload.exp * 1000;
  if (isTokenExpired) {
    return NextResponse.redirect(new URL("/user/login", request.nextUrl)); // Redirect to login page if token is expired
  }

  // Check if the user is an admin based on the payload
  const isAdmin = payload?.isAdmin;

  if (cart && !token) {
    return NextResponse.redirect(new URL("/user/login", request.nextUrl));
  }
  if (isPublic && token) {
    return NextResponse.redirect(new URL("/user", request.nextUrl));
  }
  if (account && !token) {
    return NextResponse.redirect(new URL("/user/login", request.nextUrl));
  }
  if (account && token && !isAdmin && path !== "/user") {
    return NextResponse.redirect(new URL("/user", request.nextUrl));
  }
  if (account && token && isAdmin && path !== "/user/admin") {
    return NextResponse.redirect(new URL("/user/admin", request.nextUrl));
  }
  if (updateProduct.test(path) && !isAdmin) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  return NextResponse.next(); // Continue processing if no redirection is needed
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/user/login",
    "/user/signup",
    "/user",
    "/cart",
    "/user/admin",
    "/product/updateproduct/:id*",
  ],
};
