import { getUserData } from "../../../../lib/dal";
import client from "../../../../lib/directus";
import { readItems } from "@directus/sdk";

export default async function Dashboard() {
  const response = await getUserData();

  const posts = await client.request(readItems("Posts"));

  return (
    <main>
      <h1>Hello{response?.user?.name}</h1>
    </main>
  );
}
