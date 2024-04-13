import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import validator from "validator";

import crypto from "crypto";
import { sendEmail } from "@/helpers/email";

connect();

function generateVerificationToken() {
  return crypto.randomBytes(20).toString("hex");
}
//creating expiration for token
function generateTokenExpiry() {
  return new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, email, password, confirmPassword, phoneNumber } = body;
    if (!email || !password || !phoneNumber) {
      throw new Error("All fields must be filed");
    }

    if (!validator.isEmail(email)) {
      throw new Error("Email is not valid");
    }

    if (!validator.isStrongPassword(password)) {
      throw new Error(" password not strong");
    }
    if (password !== confirmPassword) {
      throw new Error("confirm Password doesn't match");
    }
    //checks if ita an indian no
    if (!validator.isMobilePhone(phoneNumber, "en-IN")) {
      throw new Error("Phone number invalid");
    }

    const emailExist = await User.findOne({ email });
    if (emailExist) {
      //user try to to signup when user already exist
      if (emailExist.verified) {
        throw new Error("Already a user please login !!");
      }
      //user exist but not verified but verified token still alive
      if (!emailExist.verified && emailExist.verifyTokenExpiry > Date.now()) {
        throw new Error("Please verify your email !!");
      }
      //user exist but verify token expired so i delete the user from db and procceed to add that user again
      if (!emailExist.verified && emailExist.verifyTokenExpiry < Date.now()) {
        await User.findOneAndDelete({ email });
      }
    }
    //user does not exist so we are creating a new user here with hash password and sending verification token expire date
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      username,
      phoneNumber,
      email: email.toLowerCase(),
      password: hashPassword,
      verifyToken: generateVerificationToken(),
      verifyTokenExpiry: generateTokenExpiry(),
    });
    //const token = createToken(user._id);

    console.log(user);
    // After user creation email verification link send to email
    await sendEmail(
      user.email,
      "Email Verification",
      `Click the following link to verify your email: ${process.env.DOMAIN}/verify?token=${user.verifyToken}`,
      `<p>Click the following link to verify your email: <a href="${process.env.DOMAIN}/api/users/verify?token=${user.verifyToken}&action=verify-email">Verify Email</a></p>`
    );

    const response = NextResponse.json(
      {
        message:
          "Verify link sent to your email please verify and login after verification",
      },
      { status: 200 }
    );

    return response;
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    } else {
      return NextResponse.json({ mesage: error.message }, { status: 500 });
    }
  }
}
