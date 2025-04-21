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
      <div id="stuff">
        <section>
          <h1>Hello {userdata.first_name}</h1>
          <div>
            <ProfileEditForm userData={userdata} />
          </div>
        </section>

        <section id="postform">
          <PostList />
        </section>
      </div>
      <div id="blogposts">
        <h2>{userdata.first_name}'s Posts</h2>
        <div>
          <Content />
        </div>
      </div>
    </>
  );
}
