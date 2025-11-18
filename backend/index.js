import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import cors from "cors";

import patientAuthRoutes from "./routes/patientAuth.routes.js";
import doctorAuthRoutes from "./routes/doctorAuth.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,           
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/patient", patientAuthRoutes);
app.use("/api/doctor", doctorAuthRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
