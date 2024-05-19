import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json(
      {
        message: "logout successful",
      },
      { status: 200 }
    );
    response.cookies.delete("token", {
      httpOnly: true,
      secure: true,
      path: "/",
    });
    response.cookies.delete("user", { secure: true, path: "/" });

    // response.cookies.set("token", "", { httpOnly: true, secure: true });
    // response.cookies.set("user", "", { httpOnly: false, secure: true });
    return response;
  } catch (error) {
    return NextResponse.json({ message: "Unable to logout" }, { status: 400 });
  }
}
