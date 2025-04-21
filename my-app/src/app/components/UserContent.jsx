"use client";
import { useState, useEffect } from "react";

export default function Content() {
  //use states for user information
  const [currentUserPosts, setCurrentUserPosts] = useState(null);
  //might not need this one
  const [userInformation, setUserInformation] = useState(null);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        //call the fetchposts route
        const response = await fetch("/api/auth/fetchposts", {
          method: "POST",
          credentials: "include",
        });
        //recieve the information from the fetch
        const fetchedposts = await response.json();
        //if everything worked, set the states
        if (response.ok) {
          setUserInformation(fetchedposts.userdata);
          setCurrentUserPosts(fetchedposts.usersposts);
        } else {
          console.error("response not ok");
        }
      } catch (error) {
        console.error("Failed to connect to route");
      }
    };
    getUserInfo();
  }, []);

  if (currentUserPosts === null) {
    return <h2>Loading...</h2>;
  }
  if (currentUserPosts.length === 0) {
    return <h2>You don't have any posts yet.</h2>;
  } else {
    return (
      //map out the information set in the usestates
      <>
        {currentUserPosts?.map((post, index) => (
          <article key={index}>
            <h3>{post.Title}</h3>
            <p>{post.Body}</p>
          </article>
        ))}
      </>
    );
  }
}
