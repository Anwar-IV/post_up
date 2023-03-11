"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [error, setError] = useState("");

  // Create a Post
  const { mutate } = useMutation(
    async (title: string) => await axios.post("/api/posts/addPost", { title }),
    {
      onError: (error: AxiosError) => {
        console.log("The Error is -->", error);
        setError(error?.response?.data as string);
        setIsDisabled(false);
      },
      onSuccess: (data) => {
        console.log("The data returned is -->", data);
        setTitle("");
        setIsDisabled(false);
      },
    }
  );

  const submitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsDisabled(true);
    mutate(title);
  };

  return (
    <form
      onSubmit={submitPost}
      className="bg-gray-200 my-8 p-8 shadow-md rounded-md"
    >
      <div className="flex flex-col my-4">
        {error && (
          <div className="self-center">
            <p className="text-red-400 font-bold">{error}</p>
          </div>
        )}
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
          Create a Post
        </button>
      </div>
    </form>
  );
}
