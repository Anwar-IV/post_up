"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type PostProps = {
  id: string;
  name: string;
  avatar: string;
  postTitle: string;
  likes: {
    postId: string;
    userId: string;
  }[];
  comments: {
    createdAt: string;
    id: string;
    postId: string;
    userId: string;
  }[];
  width: string;
};

export default function Post({
  name,
  avatar,
  postTitle,
  id,
  likes,
  comments,
  width,
}: PostProps) {
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();
  // Like a Post
  const { mutate } = useMutation(
    async ({ postId: id }: { postId: string }) =>
      axios.post("/api/posts/postlikes", { postId: id }),
    {
      onSuccess: (data) => {
        console.log("data -->", data);
        queryClient.invalidateQueries(["posts"]);
        setIsDisabled(false);
      },
      onError: (error) => {
        console.error(error);
        toast.error("Something went wrong!");
        setIsDisabled(false);
      },
    }
  );
  const likePost = () => {
    setIsDisabled(true);
    mutate({ postId: id });
  };

  return (
    <div className={`bg-gray-200 my-8 p-8 rounded-lg ${width} mx-auto`}>
      <div className="flex items-center gap-2">
        <Image
          className="rounded-full"
          width={32}
          height={32}
          src={avatar}
          alt="avatar"
        />
        <h3 className="font-bold text-gray-700">{name}</h3>
      </div>
      <div className="my-8">
        <p className="break-all">{postTitle}</p>
      </div>
      <div className="flex gap-4 items-center">
        <Link href={`/post/${id}`}>
          <p className="text-[15px] font-bold text-gray-700">
            {comments?.length} Comments
          </p>
        </Link>
        <div className="flex items-center gap-1">
          <p className="font-bold text-gray-700 w-5 text-right">
            {likes.length}
          </p>
          <button
            onClick={likePost}
            className="disabled:opacity-60"
            disabled={isDisabled}
          >
            <AiFillHeart className="text-red-500" size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
