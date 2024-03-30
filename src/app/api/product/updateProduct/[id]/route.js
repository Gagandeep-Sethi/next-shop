import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModel";

connect();

export async function PUT(req, { params }) {
  const body = await req.json();
  const {
    name,
    category,
    description,
    images,
    originalPrice,
    discountedPrice,
    size,
  } = body;
  try {
    const products = await Product.findByIdAndUpdate(
      params.id,
      {
        name,
        category,
        description,
        images,
        originalPrice,
        displayPrice: discountedPrice,
        size,
      },
      { new: true }
    ); //new true will return the updated value rather then older value
    if (!products) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 400 }
      );
    }
    return NextResponse.json({ message: "Product updated " }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ mesage: error.mesage }, { status: 500 });
  }
}
