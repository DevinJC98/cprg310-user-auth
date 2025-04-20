import { getUserData } from "../../../../lib/dal";
import client from "../../../../lib/directus";
import { readItem, readItems, readMe, createItem } from "@directus/sdk";
import "./dashboard.css";
import ProfileEditForm from "@/app/components/ProfileEditForm";
import PostList from "@/app/components/PostForm";

export default async function Dashboard() {
  //uses the function created in lib/dal.js to authenticate the user by matching the cookies to the users session token stored in directus

  const response = await getUserData();
  //fetch the information stored in the user object. i.e. email and password.
  const userdata = await client.request(readMe({ fields: ["*"] }));
  const userposts = await client.request(readItems("Posts", { fields: ["*"] }));

  //function to display users posts on dashboard
  const findUsersPosts = () => {
    //userposts returns an array of objects, this const filters these items to only those where the user matches the author
    //As i'm writing this i'm realizing that this wouldnt work if two users had the same name.
    const usersposts = userposts.filter(
      (post) => post.author == userdata.first_name + " " + userdata.last_name
    );

    return (
      //map out the newely filtered array and return a div filled with the unique content.
      //***I need to implenent usestates so when the form is submitted the page content is refreshed***
      <>
        {usersposts.map((post, index) => (
          <div key={index}>
            <h2>{post.Title}</h2>
            <p>{post.Body}</p>
          </div>
        ))}
      </>
    );
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
          <PostList />
        </section>
      </div>
      <div id="blogposts">
        <h2>{userdata.first_name}'s Posts</h2>
        <div>{findUsersPosts()}</div>
      </div>
    </>
  );
}
