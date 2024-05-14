import Review from "@/models/reviewModal";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const reviews = await Review.find({ productId: params.id }).select(
      "comments images rating username"
    );

    if (!reviews) {
      return NextResponse.json({ reviews }, { status: 200 });
    }
    return NextResponse.json({ reviews }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "error occured" }, { status: 400 });
  }
}
