import React, {useEffect, useState} from 'react'
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { api } from '../api/api.js'

import {LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts'

const Goals = () => {

// Fixed Goals
const stepGoal = 3000
const waterGoal = 9
const calorieGoal = 200

// Today's Data
const [current, setCurrent] = useState({
  steps: 0,
  water: 0,
  calories: 0
});

const [loading, setLoading] = useState(true);

// Load Today Data
useEffect(() => {

  const loadTodayData = async () => {

    try{

      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await api.get("/health/today", 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const todayData = res.data;

      setCurrent({
        steps: todayData.steps || 0,
        water: todayData.water || 0,
        calories: todayData.calories || 0,
      })
    } catch(error){
      console.log("Today Record Error: ", error);

      setCurrent({
        steps: 0,
        water: 0,
        calories: 0
      })
    } finally {
      setLoading(false);
    }

  };

  loadTodayData();

}, []);

const stepPercentage = Math.min((current.steps / stepGoal) * 100, 100)

const waterPercentage = Math.min((current.water / waterGoal) * 100, 100)

const caloriePercentage = Math.min((current.calories / calorieGoal) * 100, 100)

// Goal Status Section

const getStatus = (percent) => {

  if(percent >= 100)
    return "Completed"

  if(percent >=50)
    return "Almost There"

  if(percent >= 0)
    return "In Progress"

  return "Not Started"
}

// Fitness Level
const average = (stepPercentage + waterPercentage + caloriePercentage) / 3

// Weekly Dummy Data

const weeklyData = [
  {day: 'Monday', steps: 1000},
  {day: 'Tuesday', steps: 2000},
  {day: 'Wednesday', steps: 1500},
  {day: 'Thursday', steps: 2800},
  {day: 'Friday', steps: 2200},
  {day: 'Saturday', steps: 3000},
  {day: 'Sunday', steps: 2500}
]

if(loading) {
  return(
    <div className='goals-container'>
      <h2>Loading Today's Data...</h2>
    </div>
  )
}

// return (
//   <div className="goals-container">

//     <h1 className="goals-title">
//       🎯 Fitness Analytics Dashboard
//     </h1>

//     {/* Progress Section */}
//     <div className="progress-grid">

//       <div className="circle-box">
//         <CircularProgressbar
//           value={stepPercentage}
//           text={`${Math.round(stepPercentage)}%`}
//           styles={buildStyles({
//             pathColor: "#3b82f6",
//             textColor: "#3b82f6",
//             trailColor: "#e5e7eb"
//           })}
//         />
//         <h3>🚶 Steps</h3>
//         <p>{current.steps} / {stepGoal}</p>
//       </div>

//       <div className="circle-box">
//         <CircularProgressbar
//           value={waterPercentage}
//           text={`${Math.round(waterPercentage)}%`}
//           styles={buildStyles({
//             pathColor: "#06b6d4",
//             textColor: "#06b6d4",
//             trailColor: "#e5e7eb"
//           })}
//         />
//         <h3>💧 Water</h3>
//         <p>{current.water} / {waterGoal}</p>
//       </div>

//       <div className="circle-box">
//         <CircularProgressbar
//           value={caloriePercentage}
//           text={`${Math.round(caloriePercentage)}%`}
//           styles={buildStyles({
//             pathColor: "#ef4444",
//             textColor: "#ef4444",
//             trailColor: "#e5e7eb"
//           })}
//         />
//         <h3>🔥 Calories</h3>
//         <p>{current.calories} / {calorieGoal}</p>
//       </div>

//     </div>

//     {/* Goal Status + Fitness */}

//     <div className="info-grid">

//       <div className="card">
//         <h2>📊 Goal Status</h2>

//         <p>
//           Steps :
//           <strong> {getStatus(stepPercentage)}</strong>
//         </p>

//         <p>
//           Water :
//           <strong> {getStatus(waterPercentage)}</strong>
//         </p>

//         <p>
//           Calories :
//           <strong> {getStatus(caloriePercentage)}</strong>
//         </p>

//       </div>

//       <div className="card">
//         <h2>🏋 Fitness Level</h2>

//         <h1>
//           {average >= 90
//             ? "🏆 Fitness Master"
//             : average >= 60
//             ? "💪 Active"
//             : "🚀 Beginner"}
//         </h1>

//         <p>
//           Overall Score:
//           {average.toFixed(1)}%
//         </p>

//       </div>

//     </div>

//     {/* Achievements + Challenge */}

//     <div className="info-grid">

//       <div className="card">

//         <h2>🏆 Achievements</h2>

//         <p>
//           {stepPercentage >= 100
//             ? "✅ Step Goal Completed"
//             : `❌ Step Goal Pending (${stepGoal - current.steps} steps left)`}
//         </p>

//         <p>
//           {waterPercentage >= 100
//             ? "✅ Water Goal Completed"
//             : `❌ Water Goal Pending (${waterGoal - current.water} glasses left)`}
//         </p>

//         <p>
//           {caloriePercentage >= 100
//             ? "✅ Calorie Goal Completed"
//             : `❌ Calorie Goal Pending (${calorieGoal - current.calories} calories left)`}
//         </p>

//       </div>

//       <div className="card challenge-card">

//         <h2>🎯 Today's Challenge</h2>

//         <p>
//           Drink{" "}
//           {Math.max(
//             0,
//             waterGoal - current.water
//           )}{" "}
//           more glasses of water 💧
//         </p>

//       </div>

//     </div>

//     {/* Insights + Streak */}

//     <div className="info-grid">

//       <div className="card">

//         <h2>💡 Goal Insights</h2>

//         <p>
//           Need{" "}
//           {Math.max(
//             0,
//             stepGoal - current.steps
//           )}{" "}
//           more steps
//         </p>

//         <p>
//           Need{" "}
//           {Math.max(
//             0,
//             waterGoal - current.water
//           )}{" "}
//           more glasses of water
//         </p>

//         <p>
//           Need{" "}
//           {Math.max(
//             0,
//             calorieGoal - current.calories
//           )}{" "}
//           more calories
//         </p>

//       </div>

//       <div className="card streak-card">

//         <h2>🔥 Streak</h2>

//         <h1>4 Days</h1>

//       </div>

//     </div>

//     {/* Chart */}

//     <div className="card chart-card">

//       <h2>📈 Weekly Steps Progress</h2>

//       <ResponsiveContainer
//         width="100%"
//         height={350}
//       >

//         <LineChart data={weeklyData}>

//           <XAxis dataKey="day" />

//           <YAxis />

//           <Tooltip />

//           <Line
//             type="monotone"
//             dataKey="steps"
//             stroke="#22c55e"
//             strokeWidth={3}
//           />

//         </LineChart>

//       </ResponsiveContainer>

//     </div>

//   </div>
// );

return (
  <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-purple-100 p-6">

    <h1 className="text-4xl font-bold text-center mb-10 text-slate-800">
      🎯 Fitness Analytics Dashboard
    </h1>

    {/* Progress Circles */}
    <div className="grid md:grid-cols-3 gap-6 mb-8">

      <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition text-center">
        <div className="w-40 mx-auto">
          <CircularProgressbar
            value={stepPercentage}
            text={`${Math.round(stepPercentage)}%`}
            styles={buildStyles({
              pathColor: "#3b82f6",
              textColor: "#3b82f6",
              trailColor: "#e5e7eb"
            })}
          />
        </div>

        <h3 className="mt-4 text-xl font-semibold">
          🚶 Steps
        </h3>

        <p className="text-gray-500">
          {current.steps} / {stepGoal}
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition text-center">
        <div className="w-40 mx-auto">
          <CircularProgressbar
            value={waterPercentage}
            text={`${Math.round(waterPercentage)}%`}
            styles={buildStyles({
              pathColor: "#06b6d4",
              textColor: "#06b6d4",
              trailColor: "#e5e7eb"
            })}
          />
        </div>

        <h3 className="mt-4 text-xl font-semibold">
          💧 Water
        </h3>

        <p className="text-gray-500">
          {current.water} / {waterGoal}
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition text-center">
        <div className="w-40 mx-auto">
          <CircularProgressbar
            value={caloriePercentage}
            text={`${Math.round(caloriePercentage)}%`}
            styles={buildStyles({
              pathColor: "#ef4444",
              textColor: "#ef4444",
              trailColor: "#e5e7eb"
            })}
          />
        </div>

        <h3 className="mt-4 text-xl font-semibold">
          🔥 Calories
        </h3>

        <p className="text-gray-500">
          {current.calories} / {calorieGoal}
        </p>
      </div>

    </div>

    {/* Goal Status + Fitness Level */}
    <div className="grid md:grid-cols-2 gap-6 mb-8">

      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">
          📊 Goal Status
        </h2>

        <div className="space-y-3">

          <div className="flex justify-between">
            <span>🚶 Steps</span>
            <span className="font-semibold">
              {getStatus(stepPercentage)}
            </span>
          </div>

          <div className="flex justify-between">
            <span>💧 Water</span>
            <span className="font-semibold">
              {getStatus(waterPercentage)}
            </span>
          </div>

          <div className="flex justify-between">
            <span>🔥 Calories</span>
            <span className="font-semibold">
              {getStatus(caloriePercentage)}
            </span>
          </div>

        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-3xl p-6 shadow-lg">

        <h2 className="text-2xl font-bold mb-4">
          🏋 Fitness Level
        </h2>

        <h1 className="text-4xl font-bold mb-3">
          {average >= 90
            ? "🏆 Fitness Master"
            : average >= 60
            ? "💪 Active"
            : "🚀 Beginner"}
        </h1>

        <p className="text-lg">
          Overall Score: {average.toFixed(1)}%
        </p>

      </div>

    </div>

    {/* Achievements + Challenge */}
    <div className="grid md:grid-cols-2 gap-6 mb-8">

      <div className="bg-white rounded-3xl p-6 shadow-lg">

        <h2 className="text-2xl font-bold mb-4">
          🏆 Achievements
        </h2>

        <div className="space-y-3">

          <p>
            {stepPercentage >= 100
              ? "✅ Step Goal Completed"
              : `❌ ${stepGoal - current.steps} steps left`}
          </p>

          <p>
            {waterPercentage >= 100
              ? "✅ Water Goal Completed"
              : `❌ ${waterGoal - current.water} glasses left`}
          </p>

          <p>
            {caloriePercentage >= 100
              ? "✅ Calorie Goal Completed"
              : `❌ ${calorieGoal - current.calories} calories left`}
          </p>

        </div>

      </div>

      <div className="bg-grDIENT-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-3xl p-6 shadow-lg">

        <h2 className="text-2xl font-bold mb-4">
          🎯 Today's Challenge
        </h2>

        <p className="text-lg">
          Drink{" "}
          {Math.max(0, waterGoal - current.water)}
          {" "}more glasses of water 💧
        </p>

      </div>

    </div>

    {/* Insights + Streak */}
    <div className="grid md:grid-cols-2 gap-6 mb-8">

      <div className="bg-white rounded-3xl p-6 shadow-lg">

        <h2 className="text-2xl font-bold mb-4">
          💡 Goal Insights
        </h2>

        <div className="space-y-2">

          <p>
            🚶 Need{" "}
            {Math.max(0, stepGoal - current.steps)}
            {" "}more steps
          </p>

          <p>
            💧 Need{" "}
            {Math.max(0, waterGoal - current.water)}
            {" "}more glasses
          </p>

          <p>
            🔥 Need{" "}
            {Math.max(0, calorieGoal - current.calories)}
            {" "}more calories
          </p>

        </div>

      </div>

      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-3xl p-6 shadow-lg text-center">

        <h2 className="text-2xl font-bold">
          🔥 Current Streak
        </h2>

        <h1 className="text-7xl font-bold my-4">
          4
        </h1>

        <p>Days</p>

      </div>

    </div>

    {/* Weekly Chart */}
    <div className="bg-white rounded-3xl p-6 shadow-lg">

      <h2 className="text-2xl font-bold mb-6">
        📈 Weekly Steps Progress
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <LineChart data={weeklyData}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="steps"
            stroke="#22c55e"
            strokeWidth={4}
          />
        </LineChart>
      </ResponsiveContainer>

    </div>

  </div>
);

}



export default Goals;