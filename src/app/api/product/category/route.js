import Product from "@/models/productModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const type = searchParams.get("type");
  const limit = searchParams.get("limit");

  try {
    let product;
    if (!limit) {
      product = await Product.find({ category: type });
    } else {
      product = await Product.find({ category: type }).limit(parseInt(limit));
    }

    if (product.length === 0) {
      return NextResponse.json({ status: 400 });
    }
    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.log(error, "error");
  }
}
