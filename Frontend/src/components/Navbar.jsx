import { NavLink, useNavigate } from "react-router-dom";

const Navbar = ({ theme, setTheme }) => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const toggleTheme = () => {
    const newTheme =
      theme === "light"
        ? "dark"
        : "light";

    setTheme(newTheme);
  };

  return (
    <>
      <nav
        className="
          sticky top-0 z-50
          bg-slate-900
          text-white
          shadow-xl
        "
      >
        <div
          className="
            max-w-7xl mx-auto
            px-6 py-4
            flex items-center
            justify-between
          "
        >
          {/* Logo */}
          <h2
            className="
              text-2xl font-bold
              cursor-pointer
            "
            onClick={() => navigate("/")}
          >
            🏋️ Health Tracker
          </h2>

          {/* Navigation Links */}
          <ul className="flex items-center gap-3">

            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl transition ${
                    isActive
                      ? "bg-blue-600"
                      : "hover:bg-slate-700"
                  }`
                }
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl transition ${
                    isActive
                      ? "bg-blue-600"
                      : "hover:bg-slate-700"
                  }`
                }
              >
                Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/goals"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl transition ${
                    isActive
                      ? "bg-blue-600"
                      : "hover:bg-slate-700"
                  }`
                }
              >
                Goals
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/history"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl transition ${
                    isActive
                      ? "bg-blue-600"
                      : "hover:bg-slate-700"
                  }`
                }
              >
                History
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/log"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl transition ${
                    isActive
                      ? "bg-blue-600"
                      : "hover:bg-slate-700"
                  }`
                }
              >
                Log Entry
              </NavLink>
            </li>

          </ul>

          {/* Right Controls */}
          <div className="flex items-center gap-3">

            {/* Theme Button */}
            <button
              onClick={toggleTheme}
              className="
                w-11 h-11
                rounded-full
                bg-slate-700
                hover:bg-slate-600
                transition
                text-lg
              "
            >
              {theme === "light"
                ? "🌙"
                : "☀️"}
            </button>

            {!token ? (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="
                    px-5 py-2
                    rounded-xl
                    bg-blue-600
                    hover:bg-blue-700
                    transition
                  "
                >
                  Login
                </button>

                <button
                  onClick={() => navigate("/register")}
                  className="
                    px-5 py-2
                    rounded-xl
                    bg-green-600
                    hover:bg-green-700
                    transition
                  "
                >
                  Register
                </button>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="
                  px-5 py-2
                  rounded-xl
                  bg-red-600
                  hover:bg-red-700
                  transition
                "
              >
                Logout
              </button>
            )}

          </div>
        </div>
      </nav>

      {/* <Outlet /> */}
    </>
  );
};

export default Navbar;