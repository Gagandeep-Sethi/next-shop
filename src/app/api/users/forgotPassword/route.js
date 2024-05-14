import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import crypto from "crypto";
import { sendEmail } from "@/helpers/email";
import { NextResponse } from "next/server";

connect();
function generateVerificationToken() {
  return crypto.randomBytes(20).toString("hex");
}
//creating expiration for token
function generateTokenExpiry() {
  return new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now
}
export async function POST(req) {
  const body = await req.json();
  const { email } = body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("No user found with this email !!");
    }
    if (!user.verified) {
      throw new Error("User noy verified !!");
    }
    if (user.googleId) {
      throw new Error(
        "You have signed in using google please login using your google account !!"
      );
    }
    user.forgotPasswordToken = generateVerificationToken();
    user.forgotPasswordTokenExpiry = generateTokenExpiry();
    await user.save();
    await sendEmail(
      user.email,
      "Reset Password",
      `Click the following link to reset your password: ${process.env.DOMAIN}/verify?token=${user.forgotPasswordToken}`,
      `<p>Click the following link to verify your email: <a href="${process.env.DOMAIN}/api/users/verify?token=${user.forgotPasswordToken}&action=reset-password">Verify Email</a></p>`
    );

    return NextResponse.json(
      { message: "Reset password link sent to your email please checkout" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    } else {
      return NextResponse.json(
        { mesage: "something went wrong" },
        { status: 500 }
      );
    }
  }
}
