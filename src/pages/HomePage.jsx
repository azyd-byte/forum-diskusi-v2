import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncReceiveThreads,
  asyncToggleUpVoteThread,
  asyncToggleDownVoteThread,
} from "../states/threads/action";
import { Link } from "react-router-dom";
import LoadingBar from "../components/LoadingBar.jsx";
import { asyncReceiveUsers } from "../states/users/action.js";
import { ThumbsUp, ThumbsDown } from "lucide-react";

function HomePage() {
  const dispatch = useDispatch();
  const threads = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);
  const authUser = useSelector((state) => state.authUser);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  const categories = [
    "all",
    ...new Set(threads.map((thread) => thread.category)),
  ];

  const formatTime = (date) => {
    const diffInSeconds = Math.floor((new Date() - new Date(date)) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} detik lalu`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} menit lalu`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} jam lalu`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} hari lalu`;
  };

  const filteredThreads =
    selectedCategory === "all"
      ? threads
      : threads.filter((thread) => thread.category === selectedCategory);

  const threadsWithOwner = filteredThreads.map((thread) => {
    const user = users.find((u) => u.id === thread.ownerId);

    return {
      ...thread,
      ownerName: user?.name,
      ownerAvatar: user?.avatar,
    };
  });

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await dispatch(asyncReceiveThreads());
      await dispatch(asyncReceiveUsers());
      setLoading(false);
    }

    fetchData();
  }, [dispatch]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <LoadingBar isLoading={loading} />
      <div className="max-w-2xl mx-auto p-4">
        <div className="container">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold text-gray-800">Threads</h1>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            kategori:
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                #{category}
              </button>
            ))}
          </div>

          {threadsWithOwner.map((thread) => {
            const isUpVoted =
              thread?.upVotesBy?.includes(authUser?.id) || false;

            const isDownVoted =
              thread?.downVotesBy?.includes(authUser?.id) || false;
            return (
              <div
                key={thread.id}
                className="bg-white rounded-xl shadow-sm p-4 mb-4 border border-gray-200"
              >
                {/* CATEGORY */}
                <p className="text-xs text-blue-500 mb-1">#{thread.category}</p>

                {/* TITLE */}
                <Link to={`/threads/${thread.id}`}>
                  <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600">
                    {thread.title}
                  </h2>
                </Link>

                {/* BODY */}
                <div
                  className="text-sm text-gray-600 mt-2 line-clamp-3 whitespace-pre-line"
                  dangerouslySetInnerHTML={{ __html: thread.body }}
                />

                {/* FOOTER */}
                <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                  {/* LEFT */}
                  <div className="flex items-center gap-4">
                    {/* UPVOTE */}
                    <button
                      onClick={() => dispatch(asyncToggleUpVoteThread(thread))}
                      className={`flex items-center gap-1 transition ${
                        isUpVoted
                          ? "text-blue-500"
                          : "text-gray-400 hover:text-blue-400"
                      }`}
                    >
                      <ThumbsUp
                        size={18}
                        fill={isUpVoted ? "currentColor" : "none"}
                      />
                      {thread?.upVotesBy?.length || 0}
                    </button>

                    {/* DOWNVOTE */}
                    <button
                      onClick={() =>
                        dispatch(asyncToggleDownVoteThread(thread))
                      }
                      className={`flex items-center gap-1 transition ${
                        isDownVoted
                          ? "text-red-500"
                          : "text-gray-400 hover:text-red-400"
                      }`}
                    >
                      <ThumbsDown
                        size={18}
                        fill={isDownVoted ? "currentColor" : "none"}
                      />
                      {thread?.downVotesBy?.length || 0}
                    </button>

                    <span>💬 {thread.totalComments}</span>
                  </div>

                  {/* RIGHT */}
                  <div className="flex items-center gap-2">
                    {/* TIME */}
                    <span>{formatTime(thread.createdAt)}</span>

                    <span>-</span>

                    {/* CREATED BY */}
                    <span className="flex items-center gap-1">
                      Dibuat oleh
                      <img
                        src={thread.ownerAvatar}
                        alt={thread.ownerName || "Unknown"}
                        className="w-5 h-5 rounded-full"
                      />
                      <strong>{thread.ownerName || "Unknown"}</strong>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          <Link to="/add">
            <button className="fixed bottom-6 right-6 bg-blue-500 text-white w-12 h-12 rounded-full text-2xl shadow-lg hover:bg-blue-600">
              +
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
