import express from "express";
import cors from "cors";
import dotenv from "dotenv";

//routes
import staffRoutes from "./src/routes/staffRoutes"

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//get staffs
app.use("/api/staffs", staffRoutes);


// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});