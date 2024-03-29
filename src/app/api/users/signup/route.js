import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";

connect();
const createToken = (_id) => {
  try {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "2d" });
  } catch (error) {
    console.error("Error creating token:", error);
    return null;
  }
};

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, email, password, confirmPassword } = body;
    if (!email || !password) {
      throw new Error("All fields must be filed");
    }

    if (!validator.isEmail(email)) {
      throw new Error("Email is not valid");
    }

    if (!validator.isStrongPassword(password)) {
      throw new Error("password not strong");
    }
    if (password !== confirmPassword) {
      throw new Error("Password doesn't match");
    }

    const emailExist = await User.findOne({ email });
    if (emailExist) {
      throw new Error("Email already exist");
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password: hashPassword,
    });
    const token = createToken(user._id);

    console.log(user);
    const response = NextResponse.json(
      { message: "user saved" },
      { status: 200 }
    );

    response.cookies.set("token", token, { httpOnly: true, secure: true });
    response.cookies.set(
      "user",
      JSON.stringify({ username: user.username, email: user.email }),
      { httpOnly: false }
    );
    return response;
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    } else {
      return NextResponse.json({ mesage: error.message }, { status: 500 });
    }
  }
}
