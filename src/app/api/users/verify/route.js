import User from "@/models/userModel";
import { NextResponse } from "next/server";

export default async function handler(req, res) {
  const { token } = req.query;

  try {
    // find user using verification token
    const user = await User.findOne({ verifyToken: token });

    if (!user || user.verifyTokenExpiry < Date.now()) {
      // Token is invalid or expired
      return NextResponse.json(
        { message: "Invalid or expired token please try to signup again" },
        { status: 400 }
      );
    }

    // Mark user as verified
    user.verified = true;
    user.verifyToken = null;
    user.verifyTokenExpiry = null;
    await user.save();

    // Redirect to a verification success page
    return NextResponse.redirect("/verification-success");
  } catch (error) {
    console.error("Error verifying user:", error);
    return NextResponse.json(
      { message: "Error verifying user" },
      { status: 500 }
    );
  }
}
