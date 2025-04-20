"use client";
//form to submit information from creating a post into posts collection in directus
export default function PostList() {
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const response = await fetch("/api/auth/createpost", {
      method: "POST",
      body: formData,
    });
  }

  return (
    <>
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="posttitle">Title</label>
        <input type="text" name="posttitle" id="posttitle" required></input>
        <label htmlFor="postcontent">Content</label>
        <input
          type="text"
          name="postcontent"
          id="postparagraph"
          required
        ></input>
        <input type="submit" id="postsubmit"></input>
      </form>
    </>
  );
}
