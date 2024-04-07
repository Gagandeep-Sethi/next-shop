import Order from "@/models/orderModel";
import Product from "@/models/productModel";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { products, email } = body;

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("user not found");
    }
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
