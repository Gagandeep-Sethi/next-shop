import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

connect();

export async function GET(req) {
  //const query = new URLSearchParams(req.url).get("query");
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  //const { searchParams } = new URL(request.url)
  // const name = searchParams.get(‘name’)
  if (!query) {
    throw new Error("Search for some email");
  }
  try {
    const users = await User.findOne({ email: query }).select(
      "username email phoneNumber "
    );
    if (!users) {
      throw new Error("No Email found related to your Search");
    }
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    } else {
      return NextResponse.json({ mesage: error.mesage }, { status: 500 });
    }
  }
}
// fetch(`/api/users/search?query=${query}`);
