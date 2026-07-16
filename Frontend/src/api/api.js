import axios from "axios";
// import dotenv from "dotenv";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log("API URL:", API_BASE_URL);
export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authApi = {
    login: (credentials) =>
        api.post("/auth/login", {
            email: credentials.email,
            password: credentials.password,
        }),
    register: (credentials) =>
        api.post("/auth/register", {
            name: credentials.name,
            email: credentials.email,
            password: credentials.password,
        }),
};

export const healthApi = {
    create: (params) =>
        api.post("/health", {
            date: params.date,
            steps: params.steps,
            water: params.water,
            calories: params.calories
        }),
    history: (data) => api.get("/health/history" ),

    // create points for all other routes

    today: () => api.get("/health/today"),

    update: (id, data) => api.put(`/health/${id}`, data),

    delete: (id) => api.delete(`/health/${id}`),

    profile: () => api.get("/health/profile"),

    streak: () => api.get("/health/streak"),

    leaderboard: () => api.get("/health/leaderboard")
}

// export const userApi = {

// }
