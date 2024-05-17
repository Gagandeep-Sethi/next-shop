import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

connect(); //its imp to connect to db in every api route

const createToken = (_id, isAdmin, expiresIn) => {
  try {
    return jwt.sign(
      { _id, isAdmin, exp: Math.floor(Date.now() / 1000) + expiresIn },
      process.env.JWT_SECRET
    );
  } catch (error) {
    return null;
  }
};

export async function POST(req) {
  const body = await req.json();
  const { email, password } = body;
  try {
    if (!email || !password) {
      throw new Error("All field must be filled");
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      throw new Error("No user found with this email !!");
    }
    if (!user.verified) {
      throw new Error("Verify your Email !!");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error("Incorrect email or password !!");
    }

    const token = createToken(user._id, user.isAdmin, 60 * 60 * 24 * 3); // Token expires in 3 days

    const response = NextResponse.json(
      { message: "user saved" },
      { status: 200 }
    );
    response.cookies.set("token", token, { httpOnly: true, secure: true });
    //response.cookies.set("token", token, { httpOnly: true , secure: true });

    response.cookies.set(
      "user",
      JSON.stringify({
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        isAdmin: user.isAdmin,
      }),
      { httpOnly: false, secure: true }
      // JSON.stringify({ username: user.username, email: user.email }),
      // { httpOnly: false, secure: true }
    );
    return response;
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    } else {
      return NextResponse.json({ mesage: error.mesage }, { status: 500 });
    }
  }
}
