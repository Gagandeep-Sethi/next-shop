import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import Order from "@/models/orderModel";
import User from "@/models/userModel";

connect();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    throw new Error("Search for some email");
  }
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("user not found");
    }

    const orders = await Order.find({ user: user._id });
    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while searching users." },
      { status: 400 }
    );
  }
}
