import Review from "@/models/reviewModal";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const reviews = await Review.find({ productId: params.id }).select(
      "comments images rating username"
    );
    console.log(reviews);
    if (!reviews) {
      console.log("no reviews yet");
      return NextResponse.json({ reviews }, { status: 200 });
    }
    return NextResponse.json({ reviews }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
