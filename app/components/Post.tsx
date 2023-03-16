"use client";

import Image from "next/image";
import Link from "next/link";
import { PostType } from "../types/PostType";

type PostProps = {
  id: string;
  name: string;
  avatar: string;
  postTitle: string;
  comments: {
    createdAt: string;
    id: string;
    postId: string;
    userId: string;
  }[];
};

export default function Post({
  name,
  avatar,
  postTitle,
  id,
  comments,
}: PostProps) {
  return (
    <div className="bg-gray-200 my-8 p-8 rounded-lg max-w-3xl mx-auto">
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
      <div className="flex gap-4 cursor-pointer items-center">
        <Link href={`/post/${id}`}>
          <p className="text-sm font-bold text-gray-700">
            {comments?.length} Comments
          </p>
        </Link>
      </div>
    </div>
  );
}
