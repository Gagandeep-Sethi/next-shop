import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

connect(); //its imp to connect to db in every api route

const createToken = (_id) => {
  try {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
  } catch (error) {
    console.error("Error creating token:", error);
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
      throw new Error("Email not found");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error("Incorrect password");
    }
    const role = user.isAdmin;
    const token = createToken(user._id);
    console.log(user);

    const response = NextResponse.json(
      //{ email, username, token, isAdmin },
      { message: "user saved" },
      { status: 200 }
    );
    response.cookies.set("token", token, { httpOnly: true });
    return response;
    // return NextResponse.json(
    //   {
    //     email,
    //     username: user.username,
    //     token,
    //     isAdmin,
    //   },
    //   { status: 200 }
    // );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    } else {
      return NextResponse.json({ mesage: error.mesage }, { status: 500 });
    }
  }
}
