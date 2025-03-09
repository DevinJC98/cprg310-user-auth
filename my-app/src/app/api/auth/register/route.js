import client from "../../../../../lib/directus";
import { registerUser } from "@directus/sdk";
import { NextRequest, NextResponse } from "next/server";

//this file will be called when the register form is submitted
export async function POST(request) {
  //this line checks all the data from the form
  const formData = await request.formData();
  //these lines specify what data we want and puts them into a variable for easy access
  const email = formData.get("email");
  const password = formData.get("password");
  const fname = formData.get("fname");
  const lname = formData.get("lname");

  //if theres no email or no password send an error
  if (!email || !password) {
    return NextResponse.json(
      { error: "One or more fields are missing." },
      { status: 400 }
    );
  }

  //this block tries to register the user submitted data into directus then redirect the user to the login page
  try {
    await client.request(
      //this function is from directus and will build a user passing the email and password as required fields. the {} after them is options for the function that fill aditional fields.
      registerUser(email, password, { first_name: fname, last_name: lname })
    );
    //sends the user to login once account created
    const url = request.nextUrl.clone();
    url.pathname = "/pages/login";
    return NextResponse.redirect(url);
  } catch {
    //if the registration fails, send an error message
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
