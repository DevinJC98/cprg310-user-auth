import client from "../../../../../lib/directus";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

//this code is called on the submit of the login form.
export async function POST(request) {
  //get the data entered in the form by the user.
  const formData = await request.formData();
  //specify what parts we want
  const email = formData.get("email");
  const password = formData.get("password");

  //if any required information is send an error
  if (!email || !password) {
    return NextResponse.json(
      { error: "One or more fields are missing " },
      { status: 400 }
    );
  }
  // trying to log in
  try {
    //match the user entered data to directus
    const response = await client.login(email, password);
    //set the cookies to the user access token stored in directus
    if (response.access_token) {
      (await cookies()).set("directus_session_token", response.access_token, {
        sameSite: "strict",
        path: "/",
        secure: true,
      });
      //if this works you can access the users information on other pages. this is used to display the users email in the dashboard
    }
    //redirect the user to the dashboard
    const url = request.nextUrl.clone();
    url.pathname = "/pages/dashboard";
    return NextResponse.redirect(url);
  } catch {
    //if the login information doesnt match the records send an error
    return NextResponse.json({ error: "Login Failed" }, { status: 500 });
  }
}
