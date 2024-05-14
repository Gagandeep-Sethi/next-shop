import ProductsBought from "@/models/productsBoughtModel";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
connect();

export async function GET(req, { params }) {
  try {
    const user = await User.findOne({ email: params.id });

    if (!user) {
      return NextResponse.json(
        { message: "An error occurred" },
        { status: 400 }
      );
    } else {
      const productBought = await ProductsBought.find({ userId: user._id });

      if (!productBought) {
        return NextResponse.json(
          { message: "An error occurred" },
          { status: 400 }
        );
      }

      return NextResponse.json({ productBought }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred", error: error.message },
      { status: 500 }
    );
  }
}
