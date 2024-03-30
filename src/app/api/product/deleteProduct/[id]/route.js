import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModel";

connect();

export async function DELETE(req, { params }) {
  try {
    const product = await Product.findByIdAndDelete(params.id);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 400 }
      );
    }
    return NextResponse.json({ message: "Product deleted " }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ mesage: error.mesage }, { status: 500 });
  }
}
