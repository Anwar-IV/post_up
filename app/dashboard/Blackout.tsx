// 'Use Client'

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

type BlackoutProps = {
  deletePost?: () => void;
  id: string;
  setBlackout: React.Dispatch<React.SetStateAction<boolean>>;
  variant: "delete" | "edit";
  title?: string;
};

let toastEditId: string;

export default function Blackout({
  deletePost,
  setBlackout,
  id,
  variant,
  title,
}: BlackoutProps) {
  const [text, setText] = useState(title!);
  const selectRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    selectRef.current?.select();
  }, []);

  const queryClient = useQueryClient();

  // Edit Post
  const updateMut = useMutation(
    async ({ id, newTitle }: { id: string; newTitle: string }) =>
      await axios.post("/api/posts/updatepost", { id, newTitle }),
    {
      onSuccess: (data) => {
        console.log(data);
        toast.success("Post updated successfully!", { id: toastEditId });
        queryClient.invalidateQueries(["user-post"]);
        setBlackout(false);
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          const { message } = error.response?.data as { message: string };
          toast.error(message, { id: toastEditId });
        } else {
          toast.error("Error occured whilst editing post!", {
            id: toastEditId,
          });
        }
      },
    }
  );
  const updatePost = () => {
    toastEditId = toast.loading("Updating Post...", { id: toastEditId });
    updateMut.mutate({ id, newTitle: text });
  };
  return (
    <div className="fixed bg-black/50 w-full h-full z-20 left-0 top-0">
      <div className="absolute bg-gray-200 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6">
        {variant === "delete" && deletePost ? (
          <>
            <h2 className="text-xl">
              Are you sure you want to delete this post?
            </h2>
            <h3 className="text-red-600 text-sm">
              This action is irreversible, you will not be able to recover this
              post.
            </h3>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => deletePost()}
                className="border-red-400 border-2 rounded-lg text-sm text-red-400 hover:text-white hover:bg-red-400 p-2 active:scale-95 transition-scale duration-300"
              >
                Delete Post
              </button>
              <button
                onClick={() => setBlackout(false)}
                className="rounded-lg text-sm text-border-slate-500 hover:text-white border-2 border-slate-500 hover:bg-slate-500 active:scale-95 transition-scale duration-300 p-2"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <textarea
              value={text}
              ref={selectRef}
              id="input"
              className={`w-[400px] ${
                text.length > 200 ? "h-60" : text.length > 100 ? "h-40" : "h-20"
              } p-4 rounded-md text-xl`}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="flex relative justify-center gap-3">
              <p
                className={`font-bold absolute left-0 text-sm ${
                  text.length > 300 ? "text-red-700" : "text-gray-700"
                }`}
              >{`${text.length} / 300`}</p>
              {updatePost ? (
                <button
                  onClick={() => updatePost()}
                  className="border-teal-600 border-2 rounded-lg text-sm text-teal-600 hover:text-white hover:bg-teal-600 p-2 active:scale-95 transition-scale duration-300"
                >
                  Update Post
                </button>
              ) : (
                "Unable to update post"
              )}
              <button
                onClick={() => setBlackout(false)}
                className="rounded-lg text-sm text-border-slate-500 hover:text-white border-2 border-slate-500 hover:bg-slate-500 active:scale-95 transition-scale duration-300 p-2"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
