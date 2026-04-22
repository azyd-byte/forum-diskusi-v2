import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncReceiveLeaderboards } from "../states/leaderboards/action";
import LoadingBar from "../components/LoadingBar";
import { Link } from "react-router-dom";

function LeaderboardPage() {
  const dispatch = useDispatch();
  const leaderboards = useSelector((state) => state.leaderboards);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await dispatch(asyncReceiveLeaderboards());
      setLoading(false);
    }

    fetchData();
  }, [dispatch]);

  return (
    <div className="bg-gray-100 min-h-screen">
      {loading && <LoadingBar />}

      <div className="max-w-2xl mx-auto p-4">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">🏆 Leaderboard</h2>

          <Link to="/">
            <button className="text-sm text-blue-500">← Back</button>
          </Link>
        </div>

        {/* LIST */}
        {leaderboards.map((item, index) => {
          const rankColor =
            index === 0
              ? "text-yellow-500"
              : index === 1
                ? "text-gray-400"
                : index === 2
                  ? "text-orange-400"
                  : "text-gray-500";

          return (
            <div
              key={item.user.id}
              className="bg-white rounded-xl shadow-sm p-4 mb-3 border border-gray-200 flex justify-between items-center"
            >
              {/* LEFT */}
              <div className="flex items-center gap-3">
                {/* RANK */}
                <span className={`text-lg font-bold w-6 ${rankColor}`}>
                  {index + 1}
                </span>

                {/* AVATAR */}
                <img
                  src={item.user.avatar}
                  alt={item.user.name}
                  className="w-10 h-10 rounded-full"
                />

                {/* NAME */}
                <span className="font-medium text-gray-800">
                  {item.user.name}
                </span>
              </div>

              {/* RIGHT */}
              <span className="text-blue-500 font-semibold">
                {item.score} pts
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LeaderboardPage;
