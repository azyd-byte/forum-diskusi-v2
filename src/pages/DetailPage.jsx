import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncAddComment,
  asyncReceiveThreadDetail,
  asyncToggleDownVoteComment,
  asyncToggleUpVoteComment,
} from "../states/threadDetail/action";
import {
  asyncToggleDownVoteThread,
  asyncToggleUpVoteThread,
} from "../states/threads/action";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import DOMPurify from "dompurify";
import { formatTime } from "../utils/formatTime";

function DetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const thread = useSelector((state) => state.threadDetail);
  const [content, setContent] = useState("");
  const authUser = useSelector((state) => state.authUser);
  const isUpVoted = thread?.upVotesBy?.includes(authUser?.id);
  const isDownVoted = thread?.downVotesBy?.includes(authUser?.id);

  function onSubmit(e) {
    e.preventDefault();
    dispatch(asyncAddComment(id, content));
    setContent("");
  }

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  if (!thread) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200 mb-4">
          <p className="text-xs text-blue-500 mb-1">#{thread.category}</p>

          <h2 className="text-xl font-bold text-gray-800">{thread.title}</h2>

          <div
            className="text-sm text-gray-600 mt-2"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(thread.body).replace(/\n/g, "<br />"),
            }}
          />

          {/* FOOTER THREAD */}
          <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
            {/* LEFT */}
            <div className="flex items-center gap-4">
              <button
                onClick={async () => {
                  await dispatch(asyncToggleUpVoteThread(thread));
                  dispatch(asyncReceiveThreadDetail(id));
                }}
                className={`flex items-center gap-1 ${
                  isUpVoted ? "text-blue-500" : "text-gray-400"
                }`}
              >
                <ThumbsUp
                  size={18}
                  fill={isUpVoted ? "currentColor" : "none"}
                />
                {thread.upVotesBy.length}
              </button>

              <button
                onClick={async () => {
                  await dispatch(asyncToggleDownVoteThread(thread));
                  dispatch(asyncReceiveThreadDetail(id));
                }}
                className={`flex items-center gap-1 ${
                  isDownVoted ? "text-red-500" : "text-gray-400"
                }`}
              >
                <ThumbsDown
                  size={18}
                  fill={isDownVoted ? "currentColor" : "none"}
                />
                {thread.downVotesBy.length}
              </button>

              <span>💬 {thread.comments.length}</span>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-2">
              <span>{formatTime(thread.createdAt)}</span>

              <span>-</span>

              <span className="flex items-center gap-1">
                Dibuat oleh
                <img
                  src={thread.owner.avatar}
                  alt={thread.owner.name}
                  className="w-5 h-5 rounded-full"
                />
                <strong>{thread.owner.name}</strong>
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-4">
          <form onSubmit={onSubmit} className="flex gap-2">
            <textarea
              placeholder="Tulis komentar..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="flex-1 border rounded-lg px-3 py-2 text-sm resize-none"
              rows={3}
            />
            <button className="bg-blue-500 text-white px-4 rounded-lg">
              Kirim
            </button>
          </form>
        </div>

        <div>
          <h3 className="font-semibold mb-2">
            Komentar ({thread.comments.length})
          </h3>

          {thread.comments.map((comment) => {
            const isUpVotedComment =
              comment?.upVotesBy?.includes(authUser?.id) || false;

            const isDownVotedComment =
              comment?.downVotesBy?.includes(authUser?.id) || false;

            return (
              <div
                key={comment.id}
                className="bg-white rounded-xl p-4 mb-3 border border-gray-200 shadow-sm"
              >
                {/* HEADER */}
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    {/* AVATAR */}
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold">
                      {comment.owner.name.slice(0, 2).toUpperCase()}
                    </div>

                    {/* NAME */}
                    <span className="font-semibold text-gray-800">
                      {comment.owner.name}
                    </span>
                  </div>

                  {/* TIME */}
                  <span className="text-xs text-gray-500">
                    {formatTime(comment.createdAt)}
                  </span>
                </div>

                {/* CONTENT */}
                <div
                  className="text-sm text-gray-700"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(comment.content).replace(
                      /\n/g,
                      "<br />",
                    ),
                  }}
                />

                <div className="flex items-center gap-4 text-sm">
                  {/* UPVOTE */}
                  <button
                    onClick={async () => {
                      await dispatch(asyncToggleUpVoteComment(comment));
                      dispatch(asyncReceiveThreadDetail(id)); // refresh
                    }}
                    className={`flex items-center gap-1 transition ${
                      isUpVotedComment
                        ? "text-blue-500"
                        : "text-gray-400 hover:text-blue-400"
                    }`}
                  >
                    <ThumbsUp
                      size={18}
                      fill={isUpVotedComment ? "currentColor" : "none"}
                    />
                    {comment?.upVotesBy?.length || 0}
                  </button>

                  {/* DOWNVOTE */}
                  <button
                    onClick={async () => {
                      await dispatch(asyncToggleDownVoteComment(comment));
                      dispatch(asyncReceiveThreadDetail(id)); // refresh
                    }}
                    className={`flex items-center gap-1 transition ${
                      isDownVotedComment
                        ? "text-red-500"
                        : "text-gray-400 hover:text-red-400"
                    }`}
                  >
                    <ThumbsDown
                      size={18}
                      fill={isDownVotedComment ? "currentColor" : "none"}
                    />
                    {comment?.downVotesBy?.length || 0}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
