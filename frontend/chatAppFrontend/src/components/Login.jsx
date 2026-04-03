import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";
import toast from "react-hot-toast";

const Login = () => {
  const [user, setUser] = React.useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${BASE_URL}/api/v1/user/login`,
        user,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setAuthUser({
          _id: res.data._id,
          fullName: res.data.fullName,
          username: res.data.username,
          profilePhoto: res.data.profilePhoto,
          gender: res.data.gender
        }));
        navigate("/");
      }
    } catch (error) {
      toast.error("Login failed");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={onsubmitHandler}
        className="w-full max-w-lg
         p-6 rounded-xl shadow-md
         bg-white/10 backdrop-blur-md border border-white/20"
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-white">Login</h1>

        {/* Username */}
        <div className="mb-4">
          <label className="block mb-1 text-white/80 text-sm">Username</label>
          <input
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            type="text"
            placeholder="Enter your username"
           // Change input className to this:
className="w-full p-2 rounded-lg border border-white/30 outline-none bg-white/10 text-white placeholder-white/50 focus:border-blue-400 focus:bg-white/20"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block mb-1 text-white/80 text-sm">Password</label>
          <input
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            type="password"
            placeholder="Enter your password"
            className="w-full p-2 rounded-lg border border-white/30 outline-none  bg-white/10 text-white placeholder-white/40 focus:border-blue-400"
          />
        </div>

        {/* Forgot Password */}
        <div className="text-left text-sm mb-2">
          <span className="text-blue-200 cursor-pointer hover:underline font-bold">
            Forgot password?
          </span>
        </div>

        {/* Signup Link */}
        <p className="text-center text-white/80 text-sm mt-2">
          Don't have an account?
          <Link to="/signup" className="text-blue-200 ml-1 hover:underline font-bold">
            Signup
          </Link>
        </p>

        {/* Button */}
        <button
          type="submit"
          className="w-full mt-4 p-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;