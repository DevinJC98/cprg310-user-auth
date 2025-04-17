import client from "../../../../../lib/directus";
import { getUserData } from "../../../../../lib/dal";
import { NextResponse } from "next/server";
import { updateMe, readMe } from "@directus/sdk";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    // Authenticate the user
    const userData = await getUserData();

    // Parse the request body
    const body = await request.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Current password and new password are required" },
        { status: 400 }
      );
    }

    // First verify the current password by trying to log in
    try {
      const user = await client.request(readMe());
      await client.login(user.email, currentPassword);
    } catch (error) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 401 }
      );
    }

    // Update the user's password in Directus
    await client.request(
      updateMe({
        password: newPassword,
      })
    );

    // Re-login the user with the new password to update the token
    const user = await client.request(readMe());
    const loginResponse = await client.login(user.email, newPassword);

    // Update the session token
    if (loginResponse.access_token) {
      (await cookies()).set(
        "directus_session_token",
        loginResponse.access_token,
        {
          sameSite: "strict",
          path: "/",
          secure: true,
        }
      );
    }

    return NextResponse.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    return NextResponse.json(
      { error: "Failed to change password" },
      { status: 500 }
    );
  }
}
