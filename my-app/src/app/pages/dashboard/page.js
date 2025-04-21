import "./dashboard.css";
import ProfileEditForm from "@/app/components/ProfileEditForm";
import PostList from "@/app/components/PostForm";
import client from "../../../../lib/directus";
import { readMe, readItems } from "@directus/sdk";
import { getUserData } from "../../../../lib/dal";
import Content from "@/app/components/UserContent";

export default async function Dashboard() {
  //get the users information to fill certain parts of the page. the rest of the page is filled with react components.
  const response = await getUserData();
  const userdata = await client.request(readMe({ fields: ["*"] }));

  //useeffect
  function log() {
    console.log(userdata.id);
  }

  return (
    <>
      <section id="userWidgets">
        <section id="profile">
          <h1>Hello {userdata.first_name}</h1>
          <ProfileEditForm userData={userdata} />
        </section>

        <section id="postform">
          <PostList />
        </section>
      </section>

      <section id="blogposts">
        <h2>{userdata.first_name}'s Posts</h2>

        <Content />
      </section>
    </>
  );
}
