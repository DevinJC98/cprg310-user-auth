import { getUserData } from "../../../../lib/dal";
import client from "../../../../lib/directus";
import { readItems } from "@directus/sdk";

export default async function Dashboard() {
  const response = await getUserData();

  const posts = await client.request(readItems("Posts"));

  return (
    <main>
      <h1>Hello {response?.user?.first_name}</h1>
      <form action="/api/auth/logout" method="POST">
        <button type="submit"> Log Out </button>
      </form>
    </main>
  );
}
