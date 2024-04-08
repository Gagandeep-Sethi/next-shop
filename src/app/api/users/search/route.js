import { URLSearchParams } from "url";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

connect();

export async function GET(req) {
  const query = new URLSearchParams(req.url).get("query");
  //const { searchParams } = new URL(request.url)
  // const name = searchParams.get(‘name’)
  try {
    const users = await User.search(query);
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Error searching users:", error);
    return NextResponse.json(
      { error: "An error occurred while searching users." },
      { status: 400 }
    );
  }
}
// fetch(`/api/users/search?query=${query}`);
