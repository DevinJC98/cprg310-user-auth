import client from "../../../../../lib/directus";
import { NextResponse } from "next/server";
import { createItem, readMe } from "@directus/sdk";
import { getUserData } from "../../../../../lib/dal";

//I created this route based off of the others
//main difference is that this route creates posts rather than users.

export async function POST(request) {
  //check whos logged in
  const response = await getUserData();
  const userdata = await client.request(readMe({ fields: ["*"] }));
  //fetch the data submitted in the create post form
  const formData = await request.formData();
  const titletext = formData.get("posttitle");
  const bodytext = formData.get("postparagraph");

  //required fields
  if (!titletext || !bodytext) {
    return NextResponse.json(
      { error: "One or more fields are missing " },
      { status: 400 }
    );
  }

  try {
    //request to create item in cms
    const response = await client.request(
      createItem("Posts", {
        Title: titletext,
        Body: bodytext,
        author: userdata.first_name + " " + userdata.last_name,
      })
    );
    //refresh the page to show new items
    const url = request.nextUrl.clone();
    url.pathname = "/pages/dashboard";
    return NextResponse.redirect(url);
  } catch {
    //error handling
    console.log("Error");
    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
