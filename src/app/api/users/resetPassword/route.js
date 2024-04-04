import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";

connect();

export async function POST(req) {
  try {
    const body = await req.json();
    const emailCookies = req.cookies.get("resetEmail")?.value; //to get this value just add credentials: 'include', while making req from client side
    const { password } = body;

    if (!validator.isStrongPassword(password)) {
      throw new Error("password not strong");
    }
    if (!emailCookies) {
      throw new Error("Email error");
    }
    const decoded = jwt.verify(emailCookies, process.env.JWT_SECRET);
    const email = decoded.encryptedEmail;
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("Email not found in database");
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    user.password = hashPassword;
    await user.save();
    return NextResponse.json(
      { message: "Password updated please login" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    if (
      error instanceof jwt.JsonWebTokenError ||
      error instanceof jwt.TokenExpiredError
    ) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 400 }
      );
    } else if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    } else {
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 500 }
      );
    }
  }
}
