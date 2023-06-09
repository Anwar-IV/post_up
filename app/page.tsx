"use client";
import axios from "axios";
import AddPost from "./components/AddPost";
import { useQuery } from "@tanstack/react-query";
import Post from "./components/Post";
import { PostType } from "./types/PostType";

// Fetch all posts
const allPosts = async () => {
  const response = await axios.get("/api/posts/getposts");
  return response.data;
};

export default function Home() {
  const { data, error, isLoading } = useQuery<PostType[]>({
    queryFn: allPosts,
    queryKey: ["posts"],
  });
  if (error) return error;
  if (isLoading) return <p className="text-center text-lg">Loading...</p>;
  return (
    <>
      <main>
        <AddPost />
        {data?.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            name={post.user.name}
            avatar={post.user.image}
            postTitle={post.title}
            comments={post?.comments!}
            likes={post.likes}
            width="max-w-3xl"
          />
        ))}
      </main>
    </>
  );
}
