// import React from "react";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { register } from "../features/authSlice";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [data, setData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [errors, setErrors] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const handleData = (e) => {
//     const { name, value } = e.target;
//     setData((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: "" }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     let newErrors = {
//       username: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     };
//     let hasError = false;

//     if (!data.username.trim()) {
//       newErrors.username = "Please enter your name";
//       hasError = true;
//     }
//     if (
//       !data.email.trim() ||
//       !data.email.includes("@") ||
//       !data.email.includes(".")
//     ) {
//       newErrors.email = "Please enter a valid email address";
//       hasError = true;
//     }
//     if (!data.password.trim()) {
//       newErrors.password = "Please enter your password";
//       hasError = true;
//     }
//     if (!data.confirmPassword.trim()) {
//       newErrors.confirmPassword = "Please enter your correct password";
//       hasError = true;
//     }
//     if (data.password !== data.confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match";
//       hasError = true;
//     }
//     setErrors(newErrors);

//     if (hasError) {
//       return;
//     }
//     dispatch(register(data));
//     navigate("/login");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100  p-20">
//       {/* Card */}
//       <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl flex overflow-hidden">
//         {/* LEFT SIDE */}
//         <div className="w-1/2 bg-linear-to-b from-blue-600 to-blue-400  p-10 flex flex-col justify-center">
//           <h1 className="text-3xl font-bold mb-4 text-center">Welcome to</h1>
//           <img
//             src="/images/New-star-logo-with-name.png"
//             alt="Mobile Shop"
//             className="w-full h-auto rounded-lg "
//           />
//         </div>

//         {/* RIGHT SIDE */}
//         <div className="w-1/2 p-10">
//           <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
//             Register New Account
//           </h2>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* User Name */}
//             <div>
//               <label className="text-gray-600 text-sm">User Name</label>
//               <input
//                 type="text"
//                 name="username"
//                 placeholder="Enter Name"
//                 value={data.username}
//                 onChange={handleData}
//                 className={`w-full p-3 rounded-lg border 
//                   ${errors.username ? "border-red-500" : "border-gray-300"} 
//                   focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none`}
//               />
//               {errors.username && (
//                 <p className="text-red-500 text-sm">{errors.username}</p>
//               )}
//             </div>
//             {/* enter emali  */}
//             <div>
//               <label className="text-gray-600 text-sm">Email Address</label>
//               <input
//                 // type="email"
//                 name="email"
//                 placeholder="Enter email"
//                 value={data.email}
//                 onChange={handleData}
//                 className={`w-full p-3 rounded-lg border 
//                   ${errors.email ? "border-red-500" : "border-gray-300"} 
//                   focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none`}
//               />
//               {errors.email && (
//                 <p className="text-red-500 text-sm">{errors.email}</p>
//               )}
//             </div>

//             {/* Password */}
//             <div>
//               <label className="text-gray-600 text-sm">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Enter password"
//                 value={data.password}
//                 onChange={handleData}
//                 className={`w-full p-3 rounded-lg border 
//                   ${errors.password ? "border-red-500" : "border-gray-300"} 
//                   focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none`}
//               />
//               {errors.password && (
//                 <p className="text-red-500 text-sm">{errors.password}</p>
//               )}
//             </div>
//             {/* Confirm Password */}
//             <div>
//               <label className="text-gray-600 text-sm">Confirm Password</label>
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 placeholder="Enter confirm password"
//                 value={data.confirmPassword}
//                 onChange={handleData}
//                 className={`w-full p-3 rounded-lg border 
//                   ${errors.confirmPassword ? "border-red-500" : "border-gray-300"} 
//                   focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none`}
//               />
//               {errors.confirmPassword && (
//                 <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
//               )}
//             </div>

//             {/* Login Button */}
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
//             >
//               Sign Up
//             </button>

//             {/* Register Link */}
//             <p className="text-sm text-gray-600 mt-2">
//               Already have an account?
//               <span
//                 onClick={() => navigate("/login")}
//                 className="text-blue-600 cursor-pointer ml-1"
//               >
//                 Sign in
//               </span>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;


import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleData = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    let hasError = false;

    if (!data.username.trim()) {
      newErrors.username = "Please enter your name";
      hasError = true;
    }
    if (
      !data.email.trim() ||
      !data.email.includes("@") ||
      !data.email.includes(".")
    ) {
      newErrors.email = "Please enter a valid email address";
      hasError = true;
    }
    if (!data.password.trim()) {
      newErrors.password = "Please enter your password";
      hasError = true;
    }
    if (!data.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please enter your correct password";
      hasError = true;
    }
    if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      hasError = true;
    }
    setErrors(newErrors);

    if (hasError) {
      return;
    }

    dispatch(register(data));
    navigate("/login");
  };

  return (
   <div className="min-h-screen flex items-center justify-center  px-4 py-10 pt-30">
  <div className="w-full max-w-4xl bg-white backdrop-blur-lg rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden">

    {/* LEFT SECTION */}
    <div className="w-full md:w-1/2 bg-linear-to-br from-blue-700 to-blue-500 p-10 flex flex-col justify-center items-center text-center">
      <h1 className="text-4xl font-extrabold text-white mb-4 tracking-wide">
        New Start
      </h1>

      <p className="text-blue-100 text-sm md:text-base max-w-sm mb-8 leading-relaxed">
        Create your account and explore the latest mobiles, accessories, and exclusive offers.
      </p>

      <img
        src="/images/New-star-logo-with-name.png"
        alt="New Start Logo"
        className="w-56 drop-shadow-xl rounded-xl"
      />
    </div>

    {/* RIGHT SECTION */}
    <div className="w-full md:w-1/2 p-8 md:p-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Create Account
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          Join us and start shopping smarter today
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* USERNAME */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            User Name
          </label>
          <input
            type="text"
            name="username"
            value={data.username}
            onChange={handleData}
            placeholder="John Doe"
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.username ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition outline-none`}
          />
          {errors.username && (
            <p className="text-xs text-red-500 mt-1">{errors.username}</p>
          )}
        </div>

        {/* EMAIL */}
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

        {/* PASSWORD */}
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

        {/* CONFIRM PASSWORD */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={data.confirmPassword}
            onChange={handleData}
            placeholder="••••••••"
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition outline-none`}
          />
          {errors.confirmPassword && (
            <p className="text-xs text-red-500 mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold tracking-wide shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
        >
          Create Account
        </button>

        {/* LOGIN LINK */}
        <p className="text-sm text-center text-gray-600">
          Already have an account?
          <span
            onClick={() => navigate("/login")}
            className="ml-1 text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            Sign In
          </span>
        </p>
      </form>
    </div>
  </div>
</div>

  );
};

export default Register;
