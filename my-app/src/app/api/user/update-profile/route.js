import client from "../../../../../lib/directus";
import { getUserData } from "../../../../../lib/dal";
import { NextResponse } from "next/server";
import { updateMe } from "@directus/sdk";

export async function POST(request) {
  try {
    // Authenticate the user
    const userData = await getUserData();

    // Parse the request body
    const body = await request.json();
    const { firstName, lastName } = body;

    if (!firstName) {
      return NextResponse.json(
        { error: "First name is required" },
        { status: 400 }
      );
    }

    // Update the user profile in Directus
    await client.request(
      updateMe({
        first_name: firstName,
        last_name: lastName || "",
      })
    );

    return NextResponse.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
