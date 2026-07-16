import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import path from 'path';
// import { fileURLToPath } from 'url';

import connectDB from './src/config/db.js';
import authRoutes from './src/routes/authRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import healthRoutes from './src/routes/healthRoutes.js';

dotenv.config();
connectDB();

const app = express();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/health", healthRoutes);

// Production
// if (process.env.NODE_ENV === "production") {

//     app.use(
//         express.static(
//             path.join(__dirname, "../Frontend/dist")
//         )
//     );

//     app.get("*", (req, res) => {
//         res.sendFile(
//             path.join(
//                 __dirname,
//                 "../Frontend/dist/index.html"
//             )
//         );
//     });
// }

// Test Route
app.get("/", (req, res) => {
    res.send("Health Tracker Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});