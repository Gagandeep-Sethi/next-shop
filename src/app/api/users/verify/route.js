import User from "@/models/userModel";
import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
//import jwt from "jsonwebtoken";
connect();

// const createToken = (email) => {
//   try {
//     return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });
//   } catch (error) {
//     console.error("Error creating token:", error);
//     return null;
//   }
// };
export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const token = searchParams.get("token");
  const action = searchParams.get("action");

  try {
    //if verification is for email
    if (action === "verify-email") {
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
      return NextResponse.redirect(`${process.env.DOMAIN}/user/verified`);
    }

    //if the verification is for forgot password
    if (action === "reset-password") {
      // find user using verification token
      const user = await User.findOne({ forgotPasswordToken: token });

      if (!user || user.forgotPasswordTokenExpiry < Date.now()) {
        // Token is invalid or expired
        return NextResponse.json(
          {
            message:
              "Invalid or expired token please try to reset password again",
          },
          { status: 400 }
        );
      }

      // updating forgot password fields

      //user.forgotPasswordToken = null;
      //user.forgotPasswordTokenExpiry = null;
      //await user.save();
      //const encryptedEmail = createToken(user.email);
      //Redirect to a verification success page
      const response = NextResponse.redirect(
        `${process.env.DOMAIN}/user/resetPassword?email=${encodeURIComponent(
          user.email
        )}&token=${encodeURIComponent(token)}`
      );
      //response.cookies.set("resetEmail", encryptedEmail, { httpOnly: true });
      //response.cookies.set("resetEmail", encryptedEmail, { httpOnly: true, secure: true });
      return response;
    }
    return NextResponse.json(
      { message: "Something went wrong Please try again !!" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error verifying user:", error);
    return NextResponse.json(
      { message: "Error verifying user" },
      { status: 500 }
    );
  }
}
