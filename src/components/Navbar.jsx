import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { unsetAuthUserActionCreator } from "../states/authUser/action";

function Navbar() {
  const dispatch = useDispatch();

  function onLogout() {
    localStorage.removeItem("token");
    dispatch(unsetAuthUserActionCreator());
  }

  return (
    <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-2xl mx-auto flex justify-between items-center p-3">
        <Link to="/" className="font-bold text-lg text-blue-600">
          Forum App
        </Link>

        <div className="flex gap-4 text-sm">
          <Link to="/" className="hover:text-blue-500">
            Threads
          </Link>

          <Link to="/leaderboard" className="hover:text-blue-500">
            Leaderboard
          </Link>

          <button onClick={onLogout} className="text-red-500">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
