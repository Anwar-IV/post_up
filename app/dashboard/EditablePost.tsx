"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import Blackout from "./Blackout";
import toast from "react-hot-toast";
import Link from "next/link";
import { AiFillHeart } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
let toastPostId: string;

type EditableProps = {
  id: string;
  avatar: string;
  name: string;
  likes: { postId: string; userId: string }[];
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
  likes,
  comments,
  id,
}: EditableProps) {
  const [delHovering, setDelHovering] = useState(false);
  const [editHovering, setEditHovering] = useState(false);
  const [deleteBlackout, setDeleteBlackout] = useState(false);
  const [editBlackout, setEditBlackout] = useState(false);

  const queryClient = useQueryClient();
  // Delete Post
  const deleteFn = async (id: string) =>
    await axios.delete("/api/posts/deletepost", { data: id });
  const deleteMut = useMutation({
    mutationFn: deleteFn,
    onError: (error) => {
      toast.error("Error occured whilst deleting post!", {
        id: toastPostId,
      });
    },
    onSuccess: (data) => {
      toast.success("Post deleted successfully!", { id: toastPostId });
      queryClient.invalidateQueries(["user-post"]);
      setDeleteBlackout(false);
    },
  });

  const deletePost = () => {
    toastPostId = toast.loading("Deleting Post...", { id: toastPostId });
    deleteMut.mutate(id);
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
          <div className="flex gap-4 items-center">
            <Link href={`/post/${id}`}>
              <p className="text-sm font-bold text-gray-700">
                {comments?.length} Comments
              </p>
            </Link>
            <div className="flex items-center gap-1">
              <p className="font-bold text-gray-700 w-5 text-right">
                {likes.length}
              </p>
              <button className="disabled:opacity-60 pointer-events-none cursor-auto">
                <AiFillHeart className="text-red-500" size={24} />
              </button>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onMouseEnter={() => setEditHovering(true)}
              onMouseLeave={() => setEditHovering(false)}
              onClick={() => setEditBlackout(true)}
              className=" w-max h-max border-2 border-slate-600 p-[6px] rounded-md hover:bg-slate-600 active:scale-95 transition-scale duration-300"
            >
              <FiEdit
                size={20}
                color={editHovering ? "white" : "rgb(71,85,105)"}
              />
            </button>

            <button
              onMouseEnter={() => setDelHovering(true)}
              onMouseLeave={() => setDelHovering(false)}
              onClick={() => setDeleteBlackout(true)}
              className=" w-max h-max border-2 border-red-400 p-[4px] rounded-md hover:bg-red-400 active:scale-95 transition-scale duration-300"
            >
              <MdDeleteForever
                size={24}
                color={delHovering ? "white" : "rgb(248,113,113)"}
              />
            </button>
          </div>
        </div>
      </div>
      {deleteBlackout ? (
        <Blackout
          id={id}
          deletePost={deletePost}
          setBlackout={setDeleteBlackout}
          variant={"delete"}
        />
      ) : editBlackout ? (
        <Blackout
          id={id}
          setBlackout={setEditBlackout}
          variant={"edit"}
          title={title}
        />
      ) : null}
    </>
  );
}
