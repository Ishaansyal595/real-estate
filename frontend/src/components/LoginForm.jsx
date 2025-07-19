import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  loginStart,
  loginSuccess,
  loginFail,
  registerStart,
  registerSuccess,
  registerFail,
} from "../redux/slice";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegister) {
      dispatch(registerStart());
      try {
        const res = await api.post("/api/user/register", {
          name,
          phone,
          email,
          password,
        });

        dispatch(registerSuccess(res.data));

        setName("");
        setPhone("");
        setEmail("");
        setPassword("");

        navigate("/");
        toast.success("User Registered Successfully!");
      } catch (err) {
        dispatch(
          registerFail(err.response?.data?.message || "Register failed")
        );
        setName("");
        setPhone("");
        setEmail("");
        setPassword("");
        toast.error("Register Failed!", error);
      }
    } else {
      dispatch(loginStart());
      try {
        const res = await api.post("/api/user/login", { email, password });

        dispatch(loginSuccess(res.data));

        setEmail("");
        setPassword("");

        navigate("/");
        toast.success("User Logged In Successfully!");
      } catch (err) {
        dispatch(loginFail(err.response?.data?.message || "Login failed"));
        toast.error("Login Failed!", error);
      }
    }
  };

  return (
    <div className="bg-gradient-to-b from-black via-blue-950 to-blue-900 flex justify-center items-center min-h-screen">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 sm:p-12 w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 text-gray-200"
        >
          <h2 className="text-3xl font-bold text-center mb-4">
            {isRegister ? "Create Account" : "Welcome Back"}
          </h2>

          {isRegister && (
            <>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="bg-transparent border-b-2 border-gray-400 focus:border-blue-500 outline-none py-2 placeholder-gray-400"
                required
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
                className="bg-transparent border-b-2 border-gray-400 focus:border-blue-500 outline-none py-2 placeholder-gray-400"
                required
              />
            </>
          )}

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            className="bg-transparent border-b-2 border-gray-400 focus:border-blue-500 outline-none py-2 placeholder-gray-400"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="bg-transparent border-b-2 border-gray-400 focus:border-blue-500 outline-none py-2 placeholder-gray-400"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? isRegister
                ? "Registering..."
                : "Logging in..."
              : isRegister
              ? "Register"
              : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-300 mt-6 text-sm">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-400 hover:underline font-medium ml-1"
          >
            {isRegister ? "Login here" : "Register here"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
