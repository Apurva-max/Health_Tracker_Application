import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../api/api.js";
import { authApi } from "../api/api.js";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await authApi.register({
        name,
        email,
        password,
      });
      setMessage(res.data.message);

      setName("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 flex items-center justify-center p-6">

    <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

      {/* Left Side */}
      <div className="hidden md:flex flex-col justify-center items-center bg-liner-to-br from-blue-600 to-purple-600 text-white p-10">

        <div className="text-center">

          <h1 className="text-5xl font-bold mb-4">
            🏋️ FitTracker
          </h1>

          <p className="text-xl opacity-90">
            Start your fitness journey today.
            Track steps, water intake, calories,
            and achieve your goals.
          </p>

          <div className="mt-10 text-8xl">
            🎯
          </div>

        </div>

      </div>

      {/* Right Side */}
      <div className="p-8 md:p-12 flex flex-col justify-center">

        <h2 className="text-4xl font-bold text-slate-800 mb-2">
          Create Account ✨
        </h2>

        <p className="text-gray-500 mb-8">
          Join FitTracker and start tracking your health
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Name */}
          <div>

            <label className="block font-medium mb-2 text-slate-700">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
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

          {/* Email */}
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
                focus:ring-cyan-200
                focus:border-cyan-500
                transition
              "
            />

          </div>

          {/* Password */}
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

          {/* Register Button */}
          <button
            type="submit"
            className="
              w-full
              py-3
              rounded-xl
              bg-gradient-to-r
              from-blue-600
              to-purple-600
              text-white
              font-semibold
              text-lg
              shadow-lg
              hover:scale-[1.02]
              hover:shadow-xl
              transition
            "
          >
            🚀 Create Account
          </button>

        </form>

        {/* Message */}
        {message && (
          <div className="mt-5 bg-green-100 border border-green-300 text-green-700 p-3 rounded-xl text-center">
            {message}
          </div>
        )}

        {/* Login Link */}
        <div className="mt-6 text-center">

          <p className="text-gray-600">
            Already have an account?
          </p>

          <Link
            to="/login"
            className="
              inline-block
              mt-2
              text-blue-600
              font-semibold
              hover:text-blue-800
            "
          >
            Login →
          </Link>

        </div>

      </div>

    </div>

  </div>
);

// return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <h1>📝 Register</h1>

//         <form onSubmit={handleSubmit}>
//           <div className="input-group">
//             <label>Name</label>
//             <input
//               type="text"
//               placeholder="Enter Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>

//           <div className="input-group">
//             <label>Email</label>
//             <input
//               type="email"
//               placeholder="Enter Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="input-group">
//             <label>Password</label>
//             <input
//               type="password"
//               placeholder="Enter Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button type="submit" className="save-btn">
//             Register
//           </button>
//         </form>

//         {message && <p className="message-box">{message}</p>}

//         <p>
//           Already have an account? <Link to="/login">Login</Link>
//         </p>
//       </div>
//     </div>
//   );.. same register page kae saath bhi karo 

};

export default Register;
