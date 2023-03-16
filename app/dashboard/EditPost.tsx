"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { MdDeleteForever } from "react-icons/md";

type EditProps = {
  id: string;
  avatar: string;
  name: string;
  title: string;
  comments?: {
    id: string;
    postId: string;
    userId: string;
  }[];
};

export default function EditPost({
  avatar,
  name,
  title,
  comments,
  id,
}: EditProps) {
  const [hovering, setHovering] = useState(false);
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
        <p className="break-all">{title}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-sm font-bold text-gray-700">
          {comments?.length} Comments
        </p>
        <button
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          className=" w-max h-max border-2 border-red-400 p-[4px] rounded-md hover:bg-red-400 active:scale-95 transition-scale duration-300"
        >
          <MdDeleteForever
            size={24}
            color={hovering ? "white" : "rgb(248,113,113)"}
          />
        </button>
      </div>
    </div>
  );
}
