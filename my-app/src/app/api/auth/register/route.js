import client from "../../../../../lib/directus";
import { registerUser } from "@directus/sdk";
import { NextRequest, NextResponse } from "next/server";

export async function Post(request) {
  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return NextResponse.json(
      { error: "One or more fields are missing." },
      { status: 400 }
    );
  }

  try {
    await client.request(registerUser(email, password));
    const url = request.nextUrl.clone();
    url.pathname = "/pages/dashboard";
    return NextResponse.redirect(url);
  } catch {
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
