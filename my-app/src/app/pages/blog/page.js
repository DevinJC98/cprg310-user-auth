import client from "../../../../lib/directus";
import { readItems } from "@directus/sdk";

export default async function BlogPage() {
  const userposts = await client.request(readItems("Posts", { fields: ["*"] }));
  return (
    //map out the information set in the usestates
    <>
      {userposts.map((post, index) => (
        <article key={index}>
          <h3 id="title">{post.Title}</h3>
          <p>{post.Body}</p>
          <p id="date">{post.date}</p>
        </article>
      ))}
    </>
  );
}
