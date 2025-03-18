import { NextResponse } from "next/server";
import { cookies } from "next/headers";

//this code is called on the submit of the login button.
export async function POST(request) {
  //redirect the user to the home page
  const url = request.nextUrl.clone();
  url.pathname = "/";
  const response = NextResponse.redirect(url);

  //clear session cookies, or in simpler terms, log the user out.
  response.cookies.set("directus_session_token", "", {});

  return response;
}
