import React, {useEffect, useState} from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
// import api from "../api/api.js";
import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css"
import { healthApi  } from "../api/api.js";

const Dashboard = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {

    const fetchHistory = async() => {

      try{

        const token = localStorage.getItem("token");

        // 
        // const res = await healthApi.history({
        //   headers: {
        //     Authorization: `Bearer ${token}`
        //   }
        // });

        const res = await healthApi.history();

        setHistory(res.data);
      } catch(error) {

        console.log(error)
      }
    }

    fetchHistory();
  }, []);
    


  const chartData = [...history]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(-7)
    .map((item ) => ({
      date: item.date,
      steps: Number(item.steps),
      water: Number(item.water),
      calories: Number(item.calories),
    }));

  // ---------- STREAK ----------
  function calculateStreak(data) {
    if (data.length === 0) return 0;

    let streak = 1;

    for (let i = data.length - 1; i > 0; i--) {
      const current = new Date(data[i].date);
      const previous = new Date(data[i - 1].date);

      const diff =
        (current - previous) /
        (1000 * 60 * 60 * 24);

      if (diff === 1) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  }

  const currentStreak = calculateStreak(history);

  // ---------- GOALS ----------
  const targetSteps = 3000;
  const targetWater = 9;
  const targetCalories = 200;

  const latest =
    history.length > 0
      ? history[0]
      : null;

  // ---------- BADGES ----------
  const badges = [];

  if (currentStreak >= 1)
    badges.push("🥉 Beginner");

  if (currentStreak >= 3)
    badges.push("💪 Consistent");

  if (currentStreak >= 7)
    badges.push("🔥 7-Day Streak");

  if (
    latest &&
    Number(latest.water) >= targetWater
  ) {
    badges.push("💧 Water Master");
  }

  if (
    latest &&
    Number(latest.steps) >= targetSteps &&
    Number(latest.calories) >= targetCalories
  ) {
    badges.push("🏅 Goal Crusher");
  }

const tips = [
  "Drink at least 8 glasses of water.",
  "Take a 10-minute walk after meals.",
  "Stretch your body every morning.",
  "Sleep at least 7-8 hours.",
  "Avoid sugary drinks.",
]

const ranDomTips = tips[Math.floor(Math.random() * tips.length)]

// .......................MONTHLY CALENDAR VIEW........................

const tileClassName = ({ date }) => {
  const dayData = history.find(
    (item) =>
      item.date ===
      date.toISOString().split("T")[0]
  );

  if (!dayData) return "";

  const completed =
    Number(dayData.steps) >= targetSteps &&
    Number(dayData.water) >= targetWater &&
    Number(dayData.calories) >= targetCalories;

  if (completed) {
    return "green-day";
  }

  if (
    Number(dayData.steps) > 0 ||
    Number(dayData.water) > 0 ||
    Number(dayData.calories) > 0
  ) {
    return "yellow-day";
  }

  return "red-day";
};

// ..................................PERSONAL RANKING....................................

const stepPercent = latest ? (Number(latest.steps) / targetSteps) * 100 : 0;
const waterPercent = latest ? (Number(latest.water) / targetWater) * 100 : 0;
const caloriePercent = latest ? (Number(latest.calories) / targetCalories) * 100 : 0;

const overall = (stepPercent + waterPercent + caloriePercent ) / 3;

let rank = "";

if(overall <= 30) rank = "🔴 Begginer";
else if(overall <= 70) rank = "🟡 Intermediate";
else rank = "🟢 Advanced";

// return (
//   <div className="dashboard">

//     <h1 className="dashboard-title">
//       🏋️ Fitness Dashboard
//     </h1>

//     {/* Top Cards */}
//     <div className="top-section">

//       <div className="card">
//         <h2>🎯 Today's Performance</h2>

//         <p>Steps: {stepPercent.toFixed(0)}%</p>
//         <p>Water: {waterPercent.toFixed(0)}%</p>
//         <p>Calories: {caloriePercent.toFixed(0)}%</p>

//         <h3>Overall: {overall.toFixed(0)}%</h3>
//       </div>

//       <div className="card">
//         <h2>🏆 Personal Ranking</h2>

//         <h1>{rank}</h1>

//         <p>
//           Overall Score:
//           {overall.toFixed(1)}%
//         </p>
//       </div>

//     </div>

//     {/* Chart */}

//     <div className="card chart-card">
//       <h2>📈 Weekly Progress</h2>

//       <LineChart
//         width={900}
//         height={350}
//         data={chartData}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="date" />
//         <YAxis />
//         <Tooltip />

//         <Line
//           type="monotone"
//           dataKey="steps"
//           stroke="#3b82f6"
//         />

//         <Line
//           type="monotone"
//           dataKey="water"
//           stroke="#06b6d4"
//         />

//         <Line
//           type="monotone"
//           dataKey="calories"
//           stroke="#ef4444"
//         />
//       </LineChart>
//     </div>

//     {/* Stats */}

//     <div className="stats-grid">

//       <div className="card">
//         <h2>🔥 Streak</h2>

//         <h1>{currentStreak}</h1>

//         <p>Days</p>
//       </div>

//       <div className="card">
//         <h2>🏅 Achievements</h2>

//         {badges.map((badge, index) => (
//           <p key={index}>{badge}</p>
//         ))}
//       </div>

//       <div className="card tip-card">
//         <h2>💡 Tip Of The Day</h2>

//         <p>{ranDomTips}</p>
//       </div>

//     </div>

//     {/* Calendar */}

//     <div className="card">
//       <h2>🗓 Monthly Progress</h2>

//       <Calendar
//         tileClassName={tileClassName}
//       />
//     </div>

//   </div>
// );

return (
  <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-purple-100 p-6">

    {/* Header */}
    <h1 className="text-4xl font-bold text-center mb-10 text-slate-800">
      🏋️ Fitness Dashboard
    </h1>

    {/* Top Section */}
    <div className="grid md:grid-cols-2 gap-6 mb-8">

      {/* Today's Performance */}
      <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition duration-300">

        <h2 className="text-2xl font-semibold mb-5">
          🎯 Today's Performance
        </h2>

        <div className="space-y-4">

          <div>
            <div className="flex justify-between mb-1">
              <span>👣 Steps</span>
              <span>{stepPercent.toFixed(0)}%</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-500 h-3 rounded-full"
                style={{ width: `${Math.min(stepPercent, 100)}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span>💧 Water</span>
              <span>{waterPercent.toFixed(0)}%</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-cyan-500 h-3 rounded-full"
                style={{ width: `${Math.min(waterPercent, 100)}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span>🔥 Calories</span>
              <span>{caloriePercent.toFixed(0)}%</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-red-500 h-3 rounded-full"
                style={{ width: `${Math.min(caloriePercent, 100)}%` }}
              ></div>
            </div>
          </div>

        </div>

        <div className="mt-6">
          <p className="font-semibold mb-2">
            Overall Score
          </p>

          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-green-500 to-blue-500 h-4 rounded-full"
              style={{ width: `${Math.min(overall, 100)}%` }}
            ></div>
          </div>

          <p className="mt-2 text-blue-600 font-bold">
            {overall.toFixed(0)}%
          </p>
        </div>

      </div>

      {/* Ranking */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-6 text-white shadow-lg">

        <h2 className="text-2xl font-semibold mb-4">
          🏆 Personal Ranking
        </h2>

        <div className="flex items-center justify-center h-40">
          <h1 className="text-5xl font-bold">
            {rank}
          </h1>
        </div>

        <p className="text-center text-lg">
          Overall Score: {overall.toFixed(1)}%
        </p>

      </div>

    </div>

    {/* Weekly Progress Chart */}
    <div className="bg-white rounded-3xl p-6 shadow-lg mb-8 overflow-x-auto">

      <h2 className="text-2xl font-semibold mb-6">
        📈 Weekly Progress
      </h2>

      <LineChart
        width={900}
        height={350}
        data={chartData}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />

        <Line
          type="monotone"
          dataKey="steps"
          stroke="#3b82f6"
          strokeWidth={3}
        />

        <Line
          type="monotone"
          dataKey="water"
          stroke="#06b6d4"
          strokeWidth={3}
        />

        <Line
          type="monotone"
          dataKey="calories"
          stroke="#ef4444"
          strokeWidth={3}
        />
      </LineChart>

    </div>

    {/* Stats Section */}
    <div className="grid md:grid-cols-3 gap-6 mb-8">

      {/* Streak */}
      <div className="bg-white rounded-3xl p-6 shadow-lg text-center">

        <h2 className="text-xl font-semibold">
          🔥 Current Streak
        </h2>

        <h1 className="text-6xl font-bold text-orange-500 my-4">
          {currentStreak}
        </h1>

        <p className="text-gray-500">
          Consecutive Days
        </p>

      </div>

      {/* Achievements */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">

        <h2 className="text-xl font-semibold mb-4">
          🏅 Achievements
        </h2>

        <div className="flex flex-wrap gap-3">

          {badges.length > 0 ? (
            badges.map((badge, index) => (
              <span
                key={index}
                className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium"
              >
                {badge}
              </span>
            ))
          ) : (
            <p className="text-gray-500">
              No badges earned yet.
            </p>
          )}

        </div>

      </div>

      {/* Tip Card */}
      <div className="bg-gradient-to-r from-violet-600 to-blue-500 rounded-3xl p-6 text-white shadow-lg">

        <h2 className="text-xl font-semibold mb-4">
          💡 Tip Of The Day
        </h2>

        <p className="text-lg leading-relaxed">
          {ranDomTips}
        </p>

      </div>

    </div>

    {/* Calendar */}
    <div className="bg-white rounded-3xl p-6 shadow-lg">

      <h2 className="text-2xl font-semibold mb-6">
        🗓 Monthly Progress
      </h2>

      <div className="flex justify-center">
        <Calendar
          tileClassName={tileClassName}
        />
      </div>

    </div>

  </div>
);
};

export default Dashboard;