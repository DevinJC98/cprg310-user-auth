import { getUserData } from "../../../../lib/dal";
import client from "../../../../lib/directus";
import { readItems, readMe } from "@directus/sdk";
import "./dashboard.css";
import ProfileEditForm from "@/app/components/ProfileEditForm";

export default async function Dashboard() {
  //uses the function created in lib/dal.js to authenticate the user by matching the cookies to the users session token stored in directus
  const response = await getUserData();
  //fetch the information stored in the user object. i.e. email and password.
  const userdata = await client.request(readMe({ fields: ["*"] }));

  return (
    <main>
      <header>
        <h1>Hello {userdata.first_name + " " + userdata.last_name}</h1>
        <div>
          <ProfileEditForm userData={userdata} />
        </div>
      </header>

      <section>
        <h2>{userdata.first_name}'s Posts</h2>
      </section>
      <section>
        <h2>{userdata.first_name}'s Posts</h2>
      </section>
      <section>
        <h2>{userdata.first_name}'s Posts</h2>
      </section>
    </main>
  );
}
