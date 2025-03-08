import "server-only";
import { cookies } from "next/headers";
import client from "./directus";
import { readMe } from "@directus/sdk";
import { redirect } from "next/navigation";

//Data Access Layer(Dal)
export async function getUserData() {
  try {
    const token = (await cookies()).get("directus_session_token")?.value;

    if (!token) {
      redirect("/login");
    }

    client.setToken(token);
    const user = await client.request(readMe());

    return { sucess: true, user };
  } catch (error) {
    redirect("/login");
  }
}
