// 'Use Client'

type BlackoutProps = {
  deletePost: () => void;
  setBlackout: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Blackout({ deletePost, setBlackout }: BlackoutProps) {
  return (
    <div className="fixed bg-black/50 w-full h-full z-20 left-0 top-0">
      <div className="absolute bg-gray-200 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6">
        <h2 className="text-xl">Are you sure you want to delete this post?</h2>
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
      </div>
    </div>
  );
}
