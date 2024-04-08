import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "@/models/orderModel";
import { connect } from "@/dbConfig/dbConfig";
connect();

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  const { razorpayOrderId, razorpaySignature, razorpayPaymentId, _id } =
    await req.json();
  const body = razorpayOrderId + "|" + razorpayPaymentId;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpaySignature;

  if (!isAuthentic) {
    return NextResponse.json(
      { message: "invalid payment signature", error: true },
      { status: 400 }
    );
  }

  const order = await Order.findById(_id);
  order.paid = true;
  order.save();

  return NextResponse.json(
    { message: "payment success", error: false },
    { status: 200 }
  );
}
