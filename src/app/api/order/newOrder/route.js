import Order from "@/models/orderModel";
import Product from "@/models/productModel";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Razorpay from "razorpay";

connect();

//instance of razorpay
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  console.log("req recieved");
  try {
    //extractig info from req
    const body = await req.json();
    const { products, email } = body;
    console.log(products, "products");
    console.log(email, "email");

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("user not found");
    }
    //making a product array that will be stored inside order schema
    const newProducts = await Promise.all(
      products.map(async (pro) => {
        const product = await Product.findById(pro._id);
        if (!product) {
          console.log("product not found");
          throw new Error("product added in list not found");
        }
        console.log("product found");
        return {
          product: pro._id,
          quantity: pro.quantity,
          price: product.displayPrice || product.originalPrice,
        };
      })
    );
    console.log(newProducts, "newProducts");
    const order = await Order.create({
      user: user._id,
      products: newProducts,
    });
    console.log(order, "order");
    //creating razor order for which the payment will be processed
    const options = {
      amount: order.totalAmount * 100,
      currency: "INR",
      receipt: order._id.toString(),
    };
    const razorOrder = await instance.orders.create(options);
    console.log(razorOrder, "razorOrder");
    //returning razor order that contains id that will be used during payment or checkout
    return NextResponse.json(
      { message: "success", razorOrder },
      { status: 200 }
    );
    //handleling errors
  } catch (error) {
    if (error instanceof Error) {
      console.log(error, "error");
      return NextResponse.json({ message: error.message }, { status: 400 });
    } else {
      console.log(error, "error");

      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 500 }
      );
    }
  }
}
