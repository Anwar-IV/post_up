"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
let toastPostId: string;

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();

  // Create a Post
  const { mutate } = useMutation(
    async (title: string) => await axios.post("/api/posts/addpost", { title }),
    {
      onError: (error: AxiosError) => {
        const { message } = error.response?.data! as { message: string };
        toast.error(message, { id: toastPostId });
        setIsDisabled(false);
      },
      onSuccess: (data) => {
        toast.success("Post uploaded successfully! 🔥", { id: toastPostId });
        queryClient.invalidateQueries(["posts"]);
        setTitle("");
        setIsDisabled(false);
      },
    }
  );

  const submitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toastPostId = toast.loading("Creating the Post... 🚀", { id: toastPostId });
    setIsDisabled(true);
    mutate(title);
  };

  return (
    <form
      onSubmit={submitPost}
      className="bg-gray-200 my-8 p-8 shadow-md rounded-md max-w-2xl m-auto"
    >
      <div className="flex flex-col my-4">
        <textarea
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What's on your mind?"
          className="p-4 text-lg shadow-xl rounded-md my-2 bg-gray-300"
        ></textarea>
      </div>
      <div className={`flex items-center justify-between`}>
        <p
          className={`font-bold text-sm ${
            title.length > 300 ? "text-red-700" : "text-gray-700"
          }`}
        >{`${title.length} / 300`}</p>
        <button
          disabled={isDisabled}
          className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl shadow-lg disabled:opacity-25 hover:scale-[1.02] active:scale-[.98] transition-scale duration-500"
          type="submit"
        >
          Upload Post
        </button>
      </div>
    </form>
  );
}
