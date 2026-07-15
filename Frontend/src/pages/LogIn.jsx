import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../api/api.js";
import { authApi } from "../api/api.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Button Clicked");

    try {

      const res = await authApi.login({
        email,
        password,
      })

      console.log('Sucess:', res.data);
      // Save token
      localStorage.setItem(
        "token",
        res.data.token
      );

      navigate("/dashboard")

      // Save user (if backend sends user object)
    //   if (res.data.user) {
    //     localStorage.setItem(
    //       "user",
    //       JSON.stringify(res.data.user)
    //     );
    //   }

      setMessage("Login Successful ✅");

      // setTimeout(() => {
      //   navigate("/");
      // }, 1000);

    } catch (error) {
    console.log("FULL ERROR:", error);
    console.log("RESPONSE:", error.response);
    console.log("DATA:", error.response?.data);

  setMessage(
    error.response?.data?.message ||
    "Login Failed"
  );
}
  };

  // return (
  //   <div className="auth-container">

  //     <div className="auth-card">

  //       <h1>🔐 Login</h1>

  //       <form onSubmit={handleSubmit}>

  //         <div className="input-group">
  //           <label>Email</label>

  //           <input
  //             type="email"
  //             placeholder="Enter Email"
  //             value={email}
  //             onChange={(e) =>
  //               setEmail(e.target.value)
  //             }
  //             required
  //           />
  //         </div>

  //         <div className="input-group">
  //           <label>Password</label>

  //           <input
  //             type="password"
  //             placeholder="Enter Password"
  //             value={password}
  //             onChange={(e) =>
  //               setPassword(e.target.value)
  //             }
  //             required
  //           />
  //         </div>

  //         <button
  //           type="submit"
  //           className="save-btn"
  //         >
  //           Login
  //         </button>

  //       </form>

  //       {message && (
  //         <p className="message-box">
  //           {message}
  //         </p>
  //       )}

  //       <p>
  //         Don't have an account?{" "}
  //         <Link to="/register">
  //           Register
  //         </Link>
  //       </p>

  //     </div>

  //   </div>
  // );

return (
  <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 flex items-center justify-center p-6">

    <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

      {/* Left Side */}
      <div className="hidden md:flex flex-col justify-center items-center bg-liner-to-br from-purple-600 to-blue-600 text-white p-10">

        <div className="text-center">

          <h1 className="text-5xl font-bold mb-4">
            🏋️ FitTracker
          </h1>

          <p className="text-xl opacity-90">
            Track your fitness journey,
            monitor progress and achieve
            your daily goals.
          </p>

          <div className="mt-10 text-8xl">
            🚀
          </div>

        </div>

      </div>

      {/* Right Side */}
      <div className="p-8 md:p-12 flex flex-col justify-center">

        <h2 className="text-4xl font-bold text-slate-800 mb-2">
          Welcome Back 👋
        </h2>

        <p className="text-gray-500 mb-8">
          Login to continue your fitness journey
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>
            <label className="block font-medium mb-2 text-slate-700">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
              className="
                w-full
                px-4
                py-3
                border
                rounded-xl
                focus:outline-none
                focus:ring-4
                focus:ring-blue-200
                focus:border-blue-500
                transition
              "
            />
          </div>

          <div>
            <label className="block font-medium mb-2 text-slate-700">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
              className="
                w-full
                px-4
                py-3
                border
                rounded-xl
                focus:outline-none
                focus:ring-4
                focus:ring-purple-200
                focus:border-purple-500
                transition
              "
            />
          </div>

          <button
            type="submit"
            className="
              w-full
              py-3
              rounded-xl
              bg-gradient-to-r
              from-purple-600
              to-blue-600
              text-white
              font-semibold
              text-lg
              shadow-lg
              hover:scale-[1.02]
              hover:shadow-xl
              transition
            "
          >
            🔐 Login
          </button>

        </form>

        {message && (
          <div className="mt-5 bg-red-100 border border-red-300 text-red-700 p-3 rounded-xl text-center">
            {message}
          </div>
        )}

        <div className="mt-6 text-center">

          <p className="text-gray-600">
            Don't have an account?
          </p>

          <Link
            to="/register"
            className="
              inline-block
              mt-2
              text-blue-600
              font-semibold
              hover:text-blue-800
            "
          >
            Create Account →
          </Link>

        </div>

      </div>

    </div>

  </div>
);
};

export default Login;