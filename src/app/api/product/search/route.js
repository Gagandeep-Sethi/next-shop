import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import Product from "@/models/productModel";

connect();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  if (!query) {
    throw new Error("Search for some product");
  }
  try {
    const products = await Product.search(query);
    if (!products) {
      throw new Error("No product found related to your Search");
    }
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    } else {
      return NextResponse.json({ mesage: error.mesage }, { status: 500 });
    }
  }
}
// fetch(`/api/users/search?query=${query}`);
