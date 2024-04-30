import { connect } from "@/dbConfig/dbConfig";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";

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
        console.log(user, "user");
        console.log(account, "account");

        const existingUser = await User.findOne({ googleId: id });
        if (existingUser) {
          console.log("user found");
          const token = createToken(existingUser._id);
          const response = NextResponse.json(
            { message: "logged in" },
            { status: 200 }
          );
          response.cookies.set("token", token, {
            httpOnly: true,
          });
          response.cookies.set(
            "user",
            JSON.stringify({
              username: existingUser.username,
              email: existingUser.email,
            }),
            { httpOnly: true }
          );
          return response;
        }
        console.log("befores db new entry");

        const newUser = await User.create({
          username: name,
          email: email.toLowerCase(),
          googleId: id,
          googleToken: access_token,
          verified: true,
        });
        console.log("after db new entry");
        console.log(newUser, "usernew");
        const token = createToken(newUser._id);
        console.log(token, "token");
        const response = NextResponse.json(
          { message: "user saved" },
          { status: 200 }
        );
        response.cookies.set("token", token, { httpOnly: true });
        //response.cookies.set("token", token, { httpOnly: true, secure: true });

        response.cookies.set(
          "user",
          JSON.stringify({ username: newUser.username, email: newUser.email }),
          { httpOnly: true }
        );
        return response;
      } catch (error) {
        console.log(error, "error");
        return NextResponse.json({ message: error.message }, { status: 500 });
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

//expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
