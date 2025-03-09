import { getUserData } from "../../../../lib/dal";
import client from "../../../../lib/directus";
import { readItems, readMe } from "@directus/sdk";
import "./dashboard.css";

export default async function Dashboard() {
  const userdata = await client.request(readMe({ fields: ["*"] }));
  const posts = await client.request(readItems("Posts"));

  return (
    <main>
      <button onClick={console.log(userdata)}>console.log</button>
      <h1>Hello {userdata.first_name + " " + userdata.last_name}</h1>
      <form action="/api/auth/logout" method="POST">
        <button type="submit"> Log Out </button>
      </form>
    </main>
  );
}
