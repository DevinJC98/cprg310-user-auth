import client from "../../../../../lib/directus";
import { readMe, readItems } from "@directus/sdk";
import { getUserData } from "../../../../../lib/dal";

export async function POST(request) {
  //aunthentication from lib/dal.js. possibly redundant but things are working and i'm not risking removing it.
  const response = await getUserData();
  //get and array containing all the users information
  const userdata = await client.request(readMe({ fields: ["*"] }));
  //get an array of everything in the posts collection
  const userposts = await client.request(readItems("Posts", { fields: ["*"] }));

  // Filter posts down to ones only crreated by the active user
  const filterposts = userposts.filter(
    (post) => post.user_created === userdata.id
  );
  const usersposts = filterposts.reverse();

  //returns the filtered array and user information in json format so it can be read by other files easily.
  return new Response(
    JSON.stringify({
      userdata,
      usersposts,
    })
  );
}
