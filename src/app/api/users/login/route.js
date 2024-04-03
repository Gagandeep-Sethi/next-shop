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
    if (!user.verified) {
      throw new Error("Verify your Email !!");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error("Incorrect password");
    }

    const token = createToken(user._id);
    console.log(user);

    const response = NextResponse.json(
      { message: "user saved" },
      { status: 200 }
    );
    response.cookies.set("token", token, { httpOnly: true });
    //response.cookies.set("token", token, { httpOnly: true , secure: true });

    response.cookies.set(
      "user",
      JSON.stringify({ username: user.username, email: user.email }),
      { httpOnly: false, secure: true }
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
