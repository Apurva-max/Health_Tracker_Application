import React, { useState } from 'react'
import {  useNavigate } from "react-router-dom";
import { api } from "../api/api.js";

const LogEntry = () => {

  const [steps, setSteps] = useState("");
  const [water, setWater] = useState("");
  const [calories, setCalories] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const today_date = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await api.post("/health",

      {
        date: today_date,
        steps: Number(steps),
        water: Number(water),
        calories: Number(calories),
      },
      {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // }
      }
    );

    setMessage(res.data.message);

    setSteps("");
    setWater("");
    setCalories("");

    setTimeout(() => {
      navigate("/history")
    }, 1000);

    } catch(error) {
      setMessage(
        error.response?.data?.message || "Something went wrong"
      )
    }
  
  };


//   return (
//   <div className="log-page">

//     <div className="log-card">

//       <h1>📝 Daily Log Entry</h1>

//       <p className="log-date">
//         <strong>Date:</strong> {today_date}
//       </p>

//       <form
//         onSubmit={handleSubmit}
//         className="log-form"
//       >
//         <div className="input-group">
//           <label>🚶 Steps</label>

//           <input
//             type="number"
//             placeholder="Enter Steps"
//             value={steps}
//             onChange={(e) =>
//               setSteps(e.target.value)
//             }
//           />
//         </div>

//         <div className="input-group">
//           <label>💧 Water (Glasses)</label>

//           <input
//             type="number"
//             placeholder="Enter Water Intake"
//             value={water}
//             onChange={(e) =>
//               setWater(e.target.value)
//             }
//           />
//         </div>

//         <div className="input-group">
//           <label>🔥 Calories</label>

//           <input
//             type="number"
//             placeholder="Enter Calories"
//             value={calories}
//             onChange={(e) =>
//               setCalories(e.target.value)
//             }
//           />
//         </div>

//         <button
//           type="submit"
//           className="save-btn"
//         >
//           Save Entry
//         </button>
//       </form>

//       {message && (
//         <div className="message-box">
//           {message}
//         </div>
//       )}

//     </div>

//   </div>
// );

return (
  <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-purple-100 flex items-center justify-center p-6">

    <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8">

      {/* Header */}
      <div className="text-center mb-8">

        <h1 className="text-4xl font-bold text-slate-800 mb-3">
          📝 Daily Log Entry
        </h1>

        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
          📅
          <span className="font-medium">
            {today_date}
          </span>
        </div>

      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* Steps */}
        <div>

          <label className="block text-lg font-semibold text-slate-700 mb-2">
            🚶 Steps
          </label>

          <input
            type="number"
            placeholder="Enter Steps"
            value={steps}
            onChange={(e) =>
              setSteps(e.target.value)
            }
            className="
              w-full
              px-4
              py-3
              rounded-2xl
              border
              border-gray-300
              focus:outline-none
              focus:ring-4
              focus:ring-blue-200
              focus:border-blue-500
              transition
            "
          />

        </div>

        {/* Water */}
        <div>

          <label className="block text-lg font-semibold text-slate-700 mb-2">
            💧 Water (Glasses)
          </label>

          <input
            type="number"
            placeholder="Enter Water Intake"
            value={water}
            onChange={(e) =>
              setWater(e.target.value)
            }
            className="
              w-full
              px-4
              py-3
              rounded-2xl
              border
              border-gray-300
              focus:outline-none
              focus:ring-4
              focus:ring-cyan-200
              focus:border-cyan-500
              transition
            "
          />

        </div>

        {/* Calories */}
        <div>

          <label className="block text-lg font-semibold text-slate-700 mb-2">
            🔥 Calories
          </label>

          <input
            type="number"
            placeholder="Enter Calories"
            value={calories}
            onChange={(e) =>
              setCalories(e.target.value)
            }
            className="
              w-full
              px-4
              py-3
              rounded-2xl
              border
              border-gray-300
              focus:outline-none
              focus:ring-4
              focus:ring-red-200
              focus:border-red-500
              transition
            "
          />

        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="
            w-full
            py-4
            rounded-2xl
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
          💾 Save Entry
        </button>

      </form>

      {/* Success Message */}
      {message && (

        <div
          className="
            mt-6
            bg-green-100
            border
            border-green-300
            text-green-700
            px-4
            py-3
            rounded-2xl
            text-center
            font-medium
          "
        >
          {message}
        </div>

      )}

      {/* Quick Tips */}
      <div className="mt-8 grid md:grid-cols-3 gap-4">

        <div className="bg-blue-50 rounded-2xl p-4 text-center">
          <div className="text-3xl mb-2">🚶</div>
          <p className="font-semibold">
            Goal
          </p>
          <p>3000 Steps</p>
        </div>

        <div className="bg-cyan-50 rounded-2xl p-4 text-center">
          <div className="text-3xl mb-2">💧</div>
          <p className="font-semibold">
            Goal
          </p>
          <p>9 Glasses</p>
        </div>

        <div className="bg-red-50 rounded-2xl p-4 text-center">
          <div className="text-3xl mb-2">🔥</div>
          <p className="font-semibold">
            Goal
          </p>
          <p>200 Calories</p>
        </div>

      </div>

    </div>

  </div>
);
};


export default LogEntry; 