import { NextResponse } from "next/server";

export async function POST(request) {
  const url = request.nextUrl.clone();
  url.pathname = "/";
  const response = NextResponse.redirect(url);

  response.cookies.set("directus_session_token", "", {});

  return response;
}
