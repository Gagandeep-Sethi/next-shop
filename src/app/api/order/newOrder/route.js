import Order from "@/models/orderModel";
import Product from "@/models/productModel";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

connect();

//instance of razorpay
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  try {
    //extractig info from req
    const body = await req.json();
    const { products, email } = body;

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("user not found");
    }
    //making a product array that will be stored inside order schema
    const newProducts = products.map(async (pro) => {
      const product = await Product.findById(pro._id);
      if (!product) {
        throw new Error("product added in list not found");
      }
      return {
        product: pro._id,
        quantity: pro.quantity,
        price: product.displayPrice || product.originalPrice,
      };
    });
    const order = await Order.create({
      user: user._id,
      product: newProducts,
    });
    //creating razor order for which the payment will be processed
    const razorOrder = await instance.orders.create(options);
    const options = {
      amount: order.totalAmount,
      currency: "INR",
      receipt: order._id.toString(),
    };
    //returning razor order that contains id that will be used during payment or checkout
    return NextResponse.json(
      { message: "success", razorOrder },
      { status: 200 }
    );
    //handleling errors
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    } else {
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 500 }
      );
    }
  }
}
