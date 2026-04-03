import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../config";

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const navigate = useNavigate();

  const handlegender = (gender) => {
    setUser({ ...user, gender });
  };

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${BASE_URL}/api/v1/user/register`,
        user,
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error occurred");
    }
    setUser({ fullName: "", username: "", password: "", confirmPassword: "", gender: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={onsubmitHandler}
        className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-white/10 backdrop-blur-md border border-white/20"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-white">Signup</h1>

        <input
          value={user.fullName}
          onChange={(e) => setUser({ ...user, fullName: e.target.value })}
          placeholder="Full Name"
          className="w-full p-3 mb-3 rounded-xl border border-white/30 bg-white/20 text-white placeholder-white/60 outline-none focus:border-blue-400"
        />

        <input
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Username"
          className="w-full p-3 mb-3 rounded-xl border border-white/30 bg-white/20 text-white placeholder-white/60 outline-none focus:border-blue-400"
        />

        <input
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-3 rounded-xl border border-white/30 bg-white/20 text-white placeholder-white/60 outline-none focus:border-blue-400"
        />

        <input
          value={user.confirmPassword}
          onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
          type="password"
          placeholder="Confirm Password"
          className="w-full p-3 mb-3 rounded-xl border border-white/30 bg-white/20 text-white placeholder-white/60 outline-none focus:border-blue-400"
        />

        {/* Gender */}
        <div className="flex items-center gap-6 mt-2 text-white">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="gender"
              checked={user.gender === "male"}
              onChange={() => handlegender("male")}
            />
            Male
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="gender"
              checked={user.gender === "female"}
              onChange={() => handlegender("female")}
            />
            Female
          </label>
        </div>

        <p className="text-center mt-4 text-white/80">
          Already have an account?
          <Link to="/login" className="text-blue-200 ml-1 hover:underline font-bold">Login</Link>
        </p>

        <button
          type="submit"
          className="w-full mt-4 p-3 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;