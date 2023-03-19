"use client";

import AddComment from "@/app/components/AddComment";
import Post from "@/app/components/Post";
import { PostType } from "@/app/types/PostType";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";

type URL = {
  params: {
    slug: string;
  };
};

const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`);
  return response.data;
};
export default function PostDetail(url: URL) {
  const { data, isLoading } = useQuery<PostType>({
    queryKey: ["post-detail"],
    queryFn: () => fetchDetails(url.params.slug),
  });
  if (isLoading) return <p className="text-center text-lg">Loading...</p>;
  console.log(data);
  return (
    <div>
      {data ? (
        <>
          <Post
            id={data.id}
            name={data.user.name}
            key={data.id}
            avatar={data.user.image}
            comments={data.comments}
            postTitle={data.title}
            width="max-w-2xl"
          />
          <AddComment id={data.id} />
          {data.comments.map((comment) => (
            <div
              key={comment.id}
              className="flex flex-col shadow-md justify-center p-4 my-4 bg-gray-200 rounded-md max-w-3xl mx-auto border-2 border-sky-600"
            >
              <div className="flex justify-between">
                <div className="flex gap-3 px-4 py-2 items-center">
                  <Image
                    className="rounded-full"
                    width={32}
                    height={32}
                    src={comment.user.image}
                    alt="avatar"
                  />
                  <p>{comment.user.name}</p>
                </div>
                <p className="px-4 pt-2 text-sm">
                  {new Intl.DateTimeFormat("en-GB", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(new Date(comment.createdAt))}
                </p>
              </div>
              <p className="px-12 py-4 text-lg">{comment.text}</p>
            </div>
          ))}
          <div className="mb-16"></div>
        </>
      ) : (
        <p className="text-center text-lg">Unable to load data</p>
      )}
    </div>
  );
}
