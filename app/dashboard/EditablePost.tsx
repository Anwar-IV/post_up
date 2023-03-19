"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import Blackout from "./Blackout";
import toast from "react-hot-toast";
import Link from "next/link";
let toastPostId: string;

type EditableProps = {
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

export default function EditablePost({
  avatar,
  name,
  title,
  comments,
  id,
}: EditableProps) {
  const [hovering, setHovering] = useState(false);
  const [blackout, setBlackout] = useState(false);
  const queryClient = useQueryClient();
  // Delete Post
  const { mutate } = useMutation(
    async (id: string) =>
      await axios.delete("/api/posts/deletepost", { data: id }),
    {
      onError: (error) => {
        toast.error("Error occured whilst deleting post!", {
          id: toastPostId,
        });
      },
      onSuccess: (data) => {
        toast.success("Post deleted successfully!", { id: toastPostId });
        queryClient.invalidateQueries(["user-post"]);
        setBlackout(false);
      },
    }
  );

  const deletePost = () => {
    toastPostId = toast.loading("Deleting the Post...", { id: toastPostId });
    mutate(id);
  };

  return (
    <>
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
          <Link href={`/post/${id}`}>
            <p className="text-sm font-bold text-gray-700">
              {comments?.length} Comments
            </p>
          </Link>
          <button
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            onClick={() => setBlackout(true)}
            className=" w-max h-max border-2 border-red-400 p-[4px] rounded-md hover:bg-red-400 active:scale-95 transition-scale duration-300"
          >
            <MdDeleteForever
              size={24}
              color={hovering ? "white" : "rgb(248,113,113)"}
            />
          </button>
        </div>
      </div>
      {blackout && (
        <Blackout deletePost={deletePost} setBlackout={setBlackout} />
      )}
    </>
  );
}
