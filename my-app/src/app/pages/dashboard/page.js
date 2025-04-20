import { getUserData } from "../../../../lib/dal";
import client from "../../../../lib/directus";
import { readItem, readItems, readMe } from "@directus/sdk";
import "./dashboard.css";
import ProfileEditForm from "@/app/components/ProfileEditForm";

export default async function Dashboard() {
  //uses the function created in lib/dal.js to authenticate the user by matching the cookies to the users session token stored in directus
  const response = await getUserData();
  //fetch the information stored in the user object. i.e. email and password.
  const userdata = await client.request(readMe({ fields: ["*"] }));
  const userposts = await client.request(readItems("Posts", { fields: ["*"] }));

  function log() {
    console.log(userposts);
  }
  const findUsersPosts = () => {
    for (let i = 0; i < userposts.length; i++) {
      if (
        userposts[i].author ==
        userdata.first_name + " " + userdata.last_name
      ) {
        return (
          <>
            <div>
              <h2>{userposts[i].Title}</h2>
              <p>{userposts[i].Body}</p>
            </div>
          </>
        );
      }
    }
  };

  return (
    <>
      <div id="stuff">
        <section>
          <h1>Hello {userdata.first_name + " " + userdata.last_name}</h1>
          <div>
            <ProfileEditForm userData={userdata} />
          </div>
        </section>

        <section id="postform">
          <h2>Create a New Post</h2>
          <label htmlFor="posttitle">Title</label>
          <input type="text" name="posttitle" id="postheader"></input>
          <label htmlFor="postcontent">Content</label>
          <input type="text" name="postcontent" id="postparagraph"></input>
          <input type="submit" id="postsubmit"></input>
        </section>
      </div>
      <div id="blogposts">
        <h2>{userdata.first_name}'s Posts</h2>
        <div>{findUsersPosts()}</div>
      </div>
    </>
  );
}
