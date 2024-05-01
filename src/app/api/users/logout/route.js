import { NextResponse } from "next/server";

export async function GET() {
  console.log("request reached on backend for logout");
  try {
    const response = NextResponse.json(
      {
        message: "logout successful",
      },
      { status: 200 }
    );
    response.cookies.delete("token", { httpOnly: true });
    response.cookies.delete("user");

    // response.cookies.set("token", "", { httpOnly: true, secure: true });
    // response.cookies.set("user", "", { httpOnly: false, secure: true });
    return response;
  } catch (error) {
    console.log(error, "error");
    return NextResponse.json({ message: "Unable to logout" }, { status: 400 });
  }
}
