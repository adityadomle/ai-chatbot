import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import chatbotRoutes from './routes/chatbot.route.js';

dotenv.config();

const app = express();

// ✅ Middlewares
app.use(express.json());
app.use(cors());

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Routes
app.use("/bot/v1", chatbotRoutes);

// ⚠️ Don't use app.listen() on Vercel
// ✅ Export app (so Vercel handles it as a serverless function)
export default app;
