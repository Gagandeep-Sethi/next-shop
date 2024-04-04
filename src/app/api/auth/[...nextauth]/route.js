import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"; // Add this line to import jwt

connect();

const createToken = (_id) => {
  try {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "2d" });
  } catch (error) {
    console.error("Error creating token:", error);
    return null;
  }
};

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        const { id, name, email } = user;
        const { access_token } = account;

        const existingUser = await User.findOne({ googleId: id });
        if (existingUser) {
          const token = createToken(existingUser._id);
          const response = NextResponse.json(
            { message: "logged in" },
            { status: 200 }
          );
          response.cookies.set("token", token, {
            httpOnly: true,
            secure: true,
          });
          response.cookies.set(
            "user",
            JSON.stringify({
              username: existingUser.username,
              email: existingUser.email,
            }),
            { httpOnly: false, secure: true }
          );
          return response;
        }

        const newUser = await User.create({
          username: name,
          email: email.toLowerCase(),
          googleId: id,
          googleToken: access_token,
          verified: true,
        });
        const token = createToken(newUser._id);
        const response = NextResponse.json(
          { message: "user saved" },
          { status: 200 }
        );
        response.cookies.set("token", token, { httpOnly: true });
        //response.cookies.set("token", token, { httpOnly: true, secure: true });

        response.cookies.set(
          "user",
          JSON.stringify({ username: newUser.username, email: newUser.email }),
          { httpOnly: false }
        );
        return response;
      } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
