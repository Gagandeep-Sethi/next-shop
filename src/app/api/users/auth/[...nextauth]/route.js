import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const authOption = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
