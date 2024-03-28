"use client";
import { SessionProvider } from "next-auth";

export const NextAuthProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
