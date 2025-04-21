"use client";

//form to submit information from creating a post into posts collection in directus
export default function PostList() {
  //push all the form info into the database and reload the page so the new content can be seen.
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const response = await fetch("/api/auth/createpost", {
      method: "POST",
      body: formData,
    });
    //I think i wasted a lot of time adding routes and turning the page content into a react component.
    //The way i had it before doing that would have worked but i wasnt reloading the window.
    window.location.reload();
  }

  return (
    <>
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="posttitle">Title</label>
        <input type="text" name="posttitle" id="posttitle" required></input>
        <label htmlFor="postparagraph">Content</label>
        <textarea
          type="text"
          name="postparagraph"
          id="postparagraph"
          required
        ></textarea>
        <input type="submit" id="postsubmit"></input>
      </form>
    </>
  );
}
