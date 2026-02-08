import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleData = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = { email: "", password: "" };
    let hasError = false;

    if (!data.email.trim()) {
      newErrors.email = "Enter your email address";
      hasError = true;
    }

    if (!data.password.trim()) {
      newErrors.password = "Enter your password";
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) return;

    try {
      const res = await dispatch(login(data)).unwrap();

      if (res.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/cart");
      }
    } catch (error) {
      console.log("login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white pt-30 px-4">
  {/* Card */}
  <div className="w-full max-w-4xl bg-white backdrop-blur-lg rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden">

    {/* LEFT SIDE */}
    <div className="w-full md:w-1/2 bg-linear-to-br from-blue-700 to-blue-500 p-10 flex flex-col justify-center items-center text-center">
      <h1 className="text-4xl font-extrabold text-white mb-6 tracking-wide">
        Welcome to
      </h1>

      <img 
        src="/images/New-star-logo-with-name.png" 
        alt="Mobile Shop" 
        className="w-56 h-auto rounded-xl drop-shadow-xl"
      />

      <p className="text-blue-100 text-sm md:text-base mt-6 max-w-xs">
        Sign in to continue shopping and manage your orders easily.
      </p>
    </div>

    {/* RIGHT SIDE */}
    <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Sign In
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleData}
            placeholder="example@mail.com"
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition outline-none`}
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleData}
            placeholder="••••••••"
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition outline-none`}
          />
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">{errors.password}</p>
          )}
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold tracking-wide shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
        >
          Sign In
        </button>

        {/* Register Link */}
        <p className="text-sm text-center text-gray-600">
          Don’t have an account?
          <span
            onClick={() => navigate("/register")}
            className="ml-1 text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>

      </form>
    </div>
  </div>
</div>

  );
};

export default Login;
