import client from "../../../../../lib/directus";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request) {
  const formData = await request.formDate();

  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return NextResponse.json(
      { error: "One or more fields are missing " },
      { status: 400 }
    );
  }
  try {
    const response = await client.login(email, password);
    if (response.access_token) {
      (await cookies()).set("directus_session_token", response.access_token, {
        sameSite: "strict",
        path: "/",
        secure: true,
      });
    }
    const url = request.nextURL.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
