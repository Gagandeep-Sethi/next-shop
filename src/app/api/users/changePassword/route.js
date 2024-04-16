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
    const idCookies = req.cookies.get("token")?.value; //set it according key value you are getting from client

    const { oldPassword, newPassword, confirmPassword } = body;

    if (!oldPassword || !newPassword || !confirmPassword) {
      throw new Error("All fields must be filed");
    }
    if (!validator.isStrongPassword(newPassword)) {
      throw new Error("password not strong");
    }
    if (newPassword !== confirmPassword) {
      throw new Error("Confirm password doesn't match");
    }
    //decoding key value from jwt oken recieved
    const decoded = jwt.verify(idCookies, process.env.JWT_SECRET);

    const id = decoded._id;

    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json(
        { message: "User not found please try again" },
        { status: 400 }
      );
    }

    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) {
      return NextResponse.json(
        { message: "Old password doesn't match" },
        { status: 400 }
      );
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashPassword;
    user.save();

    return NextResponse.json(
      { message: "Password updated please login" },
      { status: 200 }
    );

    //   if you want iser to get logged out after changing password
    //   response.cookies.set("token", "", { httpOnly: true, secure: true });
    // response.cookies.set("user", "", { httpOnly: false, secure: true });
    //you can add redirection to login page also
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
