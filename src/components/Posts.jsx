import React, { useContext } from "react";
import Post from "./Post";
import AddPost from "./AddPost";
import { PostContext } from "../providers/PostsProvider";
import { UserContext } from "../providers/UserProvider";

const Posts = () => {
  const user = useContext(UserContext);
  const posts = useContext(PostContext);

  return (
    <section className="Posts">
      <AddPost user={user} />
      {posts.map(post => (
        <Post {...post} key={post.id} />
      ))}
    </section>
  );
};

export default Posts;
