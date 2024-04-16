import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModel";
import { NextResponse } from "next/server";

connect();

export async function GET(req) {
  try {
    const product = await Product.find();

    if (!product) {
      console.log("product not found");
      throw new Error("produccts not found");
    }
    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    } else {
      return NextResponse.json({ mesage: error.mesage }, { status: 500 });
    }
  }
}
