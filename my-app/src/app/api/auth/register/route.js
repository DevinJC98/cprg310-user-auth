import client from "../../../../../lib/directus";
import { registerUser } from "@directus/sdk";
import { NextRequest, NextResponse } from "next/server";

//this file will be called when the register form is submitted
export async function POST(request) {
  //this line checks all the data from the form
  const formData = await request.formData();
  //these two lines specify what data we want
  const email = formData.get("email");
  const password = formData.get("password");

  //if theres no email or no password send an error
  if (!email || !password) {
    return NextResponse.json(
      { error: "One or more fields are missing." },
      { status: 400 }
    );
  }

  //this block tries to register the user submitted data into directus then redirect the user to the login page
  try {
    await client.request(registerUser(email, password));
    const url = request.nextUrl.clone();
    url.pathname = "/pages/dashboard";
    return NextResponse.redirect(url);
  } catch {
    //if the registration fails, send an error message
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
