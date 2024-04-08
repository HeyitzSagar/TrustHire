import express from "express";
import connectDB from "./database/db.js";
import { configDotenv } from "dotenv";
import {v2 as cloudinary} from 'cloudinary';
import cors from 'cors';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME, 
  api_key: process.env.CLOUDINARY_CLIENT_API, 
  api_secret: process.env.CLOUDINARY_CLIENT_API_SECRET, 
});
configDotenv();
connectDB();
const app = express();
app.use(cors({
  origin:[process.env.FRONTEND_URL],
  methods:['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
  credentials: true
}))
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
