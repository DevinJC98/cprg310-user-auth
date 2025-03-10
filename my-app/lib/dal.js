import "server-only";
import { cookies } from "next/headers";
import client from "./directus";
import { readMe } from "@directus/sdk";
import { redirect } from "next/navigation";

//Data Access Layer(Dal)
//this script is what verifies a user is logged in when a page is loaded
//it is currently only used on the dashboard as that is the only page dependant on user data and cannot be accessed unless logged in
export async function getUserData() {
  //try to verify if the user is logged in
  try {
    //matches the cookies set in login/route.js to the user tokens stored in directus
    const token = (await cookies()).get("directus_session_token")?.value;
    //if there is no access token, no user is currently logged in, redirect to login
    if (!token) {
      redirect("/pages/login");
    }
    //if there are cookies, use them to set the current user and return their data
    client.setToken(token);
    const user = await client.request(readMe());
    return { sucess: true, user };
  } catch (error) {
    //if the try function fails, redirect to login
    redirect("/pages/login");
  }
}
