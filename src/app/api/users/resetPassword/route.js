import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import validator from "validator";

connect();

export async function POST(req) {
  try {
    const body = await req.json();
    const { token, newPassword, confirmPassword } = body;

    if (!newPassword || !confirmPassword || !token) {
      throw new Error("All fields must be filed");
    }
    if (!validator.isStrongPassword(newPassword)) {
      throw new Error("password not strong");
    }
    if (newPassword !== confirmPassword) {
      throw new Error("confirm Password doesn't match");
    }
    const user = await User.findOne({ forgotPasswordToken: token });

    if (!user) {
      throw new Error("Server error occured please try again");
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashPassword;
    user.forgotPasswordToken = null;
    user.forgotPasswordTokenExpiry = null;
    await user.save();
    return NextResponse.json(
      { message: "Password updated please login" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    } else {
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 500 }
      );
    }
  }
}
