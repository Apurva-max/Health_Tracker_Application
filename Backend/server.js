import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './src/config/db.js';
import authRoutes from './src/routes/authRoutes.js'
import userRoutes from "./src/routes/userRoutes.js"
import healthRoutes from "./src/routes/healthRoutes.js"

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Health Tracker Backend Running ')
});

const PORT = process.env.PORT || 5000; // safety

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
console.log("Health Routes loaded");
app.use("/api/health", healthRoutes);

app.listen(process.env.PORT, () => {
    console.log(
        `Server running on port: ${PORT}`
    )
})