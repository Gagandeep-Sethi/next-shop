import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "@/models/orderModel";
import { connect } from "@/dbConfig/dbConfig";
import ProductsBought from "@/models/productsBoughtModel";
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
  const productIds = order.products.map((product) => product.product);
  //adding products in product bought list

  let productsBought = await ProductsBought.findOne({ userId: order.user });

  if (productsBought) {
    // If document exists, add new product IDs to the existing document
    productsBought.productBought = [
      ...productsBought.productBought,
      ...productIds.map((productId) => ({ _id: productId })),
    ];
  } else {
    // If document doesn't exist, create a new document
    productsBought = new ProductsBought({
      userId: order.user,
      productBought: productIds.map((productId) => ({ _id: productId })),
    });
  }
  await productsBought.save();

  return NextResponse.json(
    { message: "payment success", error: false },
    { status: 200 }
  );
}
