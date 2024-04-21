import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import Product from "@/models/productModel";

connect();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  if (!query) {
    return NextResponse.json({ status: 400 });
  }
  try {
    const regex = new RegExp(query, "i"); // Case-insensitive regex
    const suggestions = await Product.find({
      $or: [{ name: regex }, { category: regex }],
    })
      .limit(5)
      .distinct("name"); // Get distinct product names matching the regex
    return NextResponse.json({ suggestions }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: 400 });
    } else {
      return NextResponse.json({ mesage: error.mesage }, { status: 500 });
    }
  }
}
// fetch(`/api/users/search?query=${query}`);
