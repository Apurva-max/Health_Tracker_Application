import React, { useState, useEffect } from 'react'
import { api, healthApi } from '../api/api.js'

const Home = () => {

  // ✅ Greeting + Quote + Time
  const [greeting, setGreeting] = useState("")
  const [quote, setQuote] = useState("")
  const [author, setAuthor] = useState("")
  const [time, setTime] = useState(new Date())
  const [userName, setUserName] = useState("");

  // ✅ Today's Progress
  const [steps, setSteps] = useState(0)
  const [water, setWater] = useState(0)
  const [calories, setCalories] = useState(0)

  // ✅ FIXED GOALS
  const stepGoal = 3000
  const waterGoal = 9
  const calorieGoal = 200

  // ✅ LOAD TODAY DATA
  useEffect(() => {

    const fetchProfile = async() => {
      try{
        const res = await healthApi.profile();
        setUserName(res.data.name);
      } catch(error) {
        console.log(error)
      }
    }

    fetchProfile(); 

    const fetchTodayData = async () => {

        try{

          const token = localStorage.getItem("token");
          const res = await api.get("/health/today",

            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )

          const todayData = res.data;

          setSteps(todayData.steps || 0);
          setWater(todayData.water || 0) ;
          setCalories(todayData.calories || 0);

        } catch(error) {

          console.log(error);

          setSteps(0);
          setWater(0);
          setCalories(0);
        }
      }

      fetchTodayData();
  }, [])

  // ✅ Greeting + Clock + Quotes
  useEffect(() => {

    const hour = new Date().getHours()

    if (hour >= 5 && hour < 12) {
      setGreeting("Good Morning")
    }

    else if (hour >= 12 && hour < 17) {
      setGreeting("Good Afternoon")
    }

    else if (hour >= 17 && hour < 21) {
      setGreeting("Good Evening")
    }

    else {
      setGreeting("Good Night")
    }

    // Clock
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    // Quotes
    fetch("https://dummyjson.com/quotes")
      .then(res => res.json())
      .then(data => {

        const randomIndex =
          Math.floor(Math.random() * data.quotes.length)

        setQuote(data.quotes[randomIndex].quote)
        setAuthor(data.quotes[randomIndex].author)
      })

    return () => clearInterval(interval)

  }, [])

  // ✅ Progress Percentages
  const stepPercent =
    Math.min((steps / stepGoal) * 100, 100)

  const waterPercent =
    Math.min((water / waterGoal) * 100, 100)

  const caloriePercent =
    Math.min((calories / calorieGoal) * 100, 100)

  // ✅ Motivation Message
  const getMotivation = () => {

    const total =
      stepPercent + waterPercent + caloriePercent

    const average = total / 3

    if (average >= 100) {
      return "🎉 Amazing! Goals Completed!"
    }

    if (average >= 60) {
      return "🔥 Great Progress! Keep Going!"
    }

    return "🚀 Start Your Day Strong!"
  }
  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-purple-100 p-6">

    {/* Greeting Section */}
    <div className="text-center mb-10">

      <h1 className="text-5xl font-bold text-slate-800 dark:text-white mb-3">
        {greeting} {userName} 🌸
      </h1>

      <p className="text-gray-600 dark:text-gray-300 text-lg">
        {time.toLocaleDateString()}
      </p>

      <p className="text-gray-600 dark:text-gray-300 text-lg">
        {time.toLocaleTimeString()}
      </p>

      <div className="mt-5 inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-2xl shadow-lg">
        <h3 className="font-medium">
          {getMotivation()}
        </h3>
      </div>

    </div>

    {/* Today's Summary */}
    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 mb-8">

      <h2 className="text-3xl font-bold text-slate-800 mb-8">
        📊 Today's Summary
      </h2>

      {/* Steps */}
      <div className="mb-8">

        <div className="flex justify-between mb-2">

          <span className="font-semibold">
            🚶 Steps
          </span>

          <span>
            {steps} / {stepGoal}
          </span>

        </div>

        <div className="w-full bg-gray-200 rounded-full h-4">

          <div
            className="bg-blue-500 h-4 rounded-full transition-all duration-500"
            style={{
              width: `${Math.min(stepPercent, 100)}%`
            }}
          ></div>

        </div>

        <p className="mt-2 text-blue-600 font-medium">
          {Math.round(stepPercent)}% Completed
        </p>

      </div>

      {/* Water */}
      <div className="mb-8">

        <div className="flex justify-between mb-2">

          <span className="font-semibold">
            💧 Water
          </span>

          <span>
            {water} / {waterGoal}
          </span>

        </div>

        <div className="w-full bg-gray-200 rounded-full h-4">

          <div
            className="bg-cyan-500 h-4 rounded-full transition-all duration-500"
            style={{
              width: `${Math.min(waterPercent, 100)}%`
            }}
          ></div>

        </div>

        <p className="mt-2 text-cyan-600 font-medium">
          {Math.round(waterPercent)}% Completed
        </p>

      </div>

      {/* Calories */}
      <div>

        <div className="flex justify-between mb-2">

          <span className="font-semibold">
            🔥 Calories
          </span>

          <span>
            {calories} / {calorieGoal}
          </span>

        </div>

        <div className="w-full bg-gray-200 rounded-full h-4">

          <div
            className="bg-red-500 h-4 rounded-full transition-all duration-500"
            style={{
              width: `${Math.min(caloriePercent, 100)}%`
            }}
          ></div>

        </div>

        <p className="mt-2 text-red-600 font-medium">
          {Math.round(caloriePercent)}% Completed
        </p>

      </div>

    </div>

    {/* Remaining Goals */}
    <div className="grid md:grid-cols-3 gap-6 mb-8">

      <div className="bg-white rounded-3xl shadow-lg p-6 text-center">

        <div className="text-5xl mb-3">
          🚶
        </div>

        <h3 className="text-lg font-semibold">
          Steps Left
        </h3>

        <p className="text-3xl font-bold text-blue-600 mt-2">
          {stepGoal - steps > 0
            ? stepGoal - steps
            : 0}
        </p>

      </div>

      <div className="bg-white rounded-3xl shadow-lg p-6 text-center">

        <div className="text-5xl mb-3">
          💧
        </div>

        <h3 className="text-lg font-semibold">
          Water Left
        </h3>

        <p className="text-3xl font-bold text-cyan-600 mt-2">
          {waterGoal - water > 0
            ? waterGoal - water
            : 0}
        </p>

      </div>

      <div className="bg-white rounded-3xl shadow-lg p-6 text-center">

        <div className="text-5xl mb-3">
          🔥
        </div>

        <h3 className="text-lg font-semibold">
          Calories Left
        </h3>

        <p className="text-3xl font-bold text-red-600 mt-2">
          {calorieGoal - calories > 0
            ? calorieGoal - calories
            : 0}
        </p>

      </div>

    </div>

    {/* Quote Card */}
    <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white rounded-3xl shadow-xl p-8 text-center">

      <h2 className="text-2xl font-bold mb-4">
        ✨ Daily Inspiration
      </h2>

      {quote ? (
        <>
          <p className="text-xl italic leading-relaxed">
            "{quote}"
          </p>

          <p className="mt-4 font-semibold">
            — {author}
          </p>
        </>
      ) : (
        <p className="text-lg">
          Loading Quote...
        </p>
      )}

    </div>

  </div>
);
}

export default Home