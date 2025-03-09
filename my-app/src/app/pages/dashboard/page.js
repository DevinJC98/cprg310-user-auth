import { getUserData } from "../../../../lib/dal";
import client from "../../../../lib/directus";
import { readItems, readMe } from "@directus/sdk";
import "./dashboard.css";

export default async function Dashboard() {
  //uses the function created in lib/dal.js to authenticate the user by matching the cookies to the users session token stored in directus
  const response = await getUserData();
  //fetch the information stored in the user object. i.e. email and password.
  const userdata = await client.request(readMe({ fields: ["*"] }));
  //this isnt being used yet. it will fetch items from the posts collection. to use this you will need to add more details and map the results.
  const posts = await client.request(readItems("Posts"));

  return (
    <main>
      <h1>Hello {userdata.first_name + " " + userdata.last_name}</h1>
      <form action="/api/auth/logout" method="POST">
        <button type="submit"> Log Out </button>
      </form>
    </main>
  );
}
