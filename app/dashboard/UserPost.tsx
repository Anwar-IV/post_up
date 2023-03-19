"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UserPost } from "../types/UserPostType";
import EditablePost from "./EditablePost";

const fetchUserPost = async () => {
  const response = await axios.get("/api/posts/getpost");
  return response.data;
};

export default function UsersPost() {
  const { data, isLoading } = useQuery<UserPost>({
    queryFn: fetchUserPost,
    queryKey: ["user-post"],
  });
  if (isLoading)
    return <p className="text-center mt-8 text-lg"> Loading Posts...</p>;
  if (!data?.posts.length)
    return (
      <p className="text-center mt-8 text-lg"> You currently have no posts.</p>
    );
  return (
    <div>
      {data?.posts.map((post) => (
        <EditablePost
          key={post.id}
          name={data.name}
          avatar={data.image}
          id={post.id}
          title={post.title}
          comments={post.comments}
        />
      ))}
    </div>
  );
}
