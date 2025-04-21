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
          console.error("error");
        }
      } catch (error) {
        console.error("errory message");
      }
    };
    getUserInfo();
  }, []);

  return (
    //map out the information set in the usestates
    <>
      {currentUserPosts?.map((post, index) => (
        <div key={index}>
          <h2>{post.Title}</h2>
          <p>{post.Body}</p>
        </div>
      ))}
    </>
  );
}
