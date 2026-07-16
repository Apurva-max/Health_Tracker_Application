import React, { useState, useEffect } from 'react'
import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from 'react-router-dom'

import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import LogEntry from './pages/LogEntry'
import History from './pages/History'
import Goals from './pages/Goals'
import Home from './pages/Home'
import Login from './pages/LogIn'
import Register from './pages/Register'

function Layout({ theme, setTheme }) {
  return (
    <>
      <Navbar theme={theme} setTheme={setTheme} />
      <Outlet />
    </>
  )
}

function App() {

  console.log("ENV TEST:", import.meta.env.VITE_API_BASE_URL);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light"
  })

useEffect(() => {

  document.documentElement.classList.remove(
    "light",
    "dark"
  );

  document.documentElement.classList.add(theme);

  localStorage.setItem("theme", theme);

}, [theme]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<Layout theme={theme} setTheme={setTheme} />}>
          <Route path='/' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/log' element={<LogEntry />} />
          <Route path='/history' element={<History />} />
          <Route path='/goals' element={<Goals />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> 
        </Route>
      </>
    )
  )

  return <RouterProvider router={router} />
}

export default App;
