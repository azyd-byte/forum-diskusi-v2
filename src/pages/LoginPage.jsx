// import { useState } from "react";
import { useDispatch } from "react-redux";
import { asyncLogin } from "../states/authUser/action";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function LoginPage() {
  const dispatch = useDispatch();

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  // function onSubmit(e) {
  //   e.preventDefault();
  //   dispatch(asyncLogin({ email, password }));
  //   navigate("/");
  // }

  const onSubmit = ({ email, password }) => {
    dispatch(asyncLogin({ email, password }));
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold text-center mb-4">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            className="border rounded-lg px-3 py-2 text-sm"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
            {...register("email", { required: true })}
          />

          <input
            type="password"
            placeholder="Password"
            className="border rounded-lg px-3 py-2 text-sm"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            {...register("password", { required: true })}
          />

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Belum punya akun?{" "}
          <Link to="/register" className="text-blue-500">
            Daftar
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
