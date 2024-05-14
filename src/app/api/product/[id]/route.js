import Product from "@/models/productModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const product = await Product.findById(params.id);

    if (!product) {
      return NextResponse.json(
        { message: "product not found" },
        { status: 400 }
      );
    }
    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {}
}
