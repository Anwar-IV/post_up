"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
let commentToastId: string;

type AddCommentProps = {
  id: string;
};

export default function AddComment({ id }: AddCommentProps) {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    async ({ title, postId }: { title: string; postId: string }) =>
      axios.post("/api/posts/addcomment", { title, postId }),
    {
      onSuccess: (data) => {
        toast.success("Comment added successfully!", { id: commentToastId });
        queryClient.invalidateQueries(["post-detail"]);
        setTitle("");
        setIsDisabled(false);
      },
      onError: (error: AxiosError) => {
        const { message } = error.response?.data as { message: string };
        toast.error(message, { id: commentToastId });
        setIsDisabled(false);
      },
    }
  );

  const uploadComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsDisabled(true);
    commentToastId = toast.loading("Adding comment...", { id: commentToastId });
    mutate({ title, postId: id });
  };
  return (
    <form
      onSubmit={uploadComment}
      className="mt-12 mb-8 max-w-4xl mx-auto"
      autoComplete="off"
    >
      <h3 className="mx-3 font-bold text-lg">Add a Comment</h3>
      <div className="flex flex-col m-2">
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          name="title"
          id="input"
          className="p-4 text-lg shadow-xl rounded-md my-2 bg-gray-200 "
        />
      </div>
      <div className={`flex items-center justify-between gap-4 mx-4`}>
        <p
          className={`font-bold text-sm w-20 text-center ${
            title.length > 300 ? "text-red-700" : "text-gray-700"
          }`}
        >{`${title.length} / 300`}</p>
        <button
          disabled={isDisabled}
          className="text-sm bg-sky-600 text-white py-2 px-6 rounded-xl shadow-lg disabled:opacity-25 hover:scale-[1.02] active:scale-[.98] transition-scale duration-500"
          type="submit"
        >
          Upload Comment
        </button>
      </div>
    </form>
  );
}
