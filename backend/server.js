import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

//routes
import staffRoutes from "./src/routes/staffRoutes.js"
import roleRoutes from "./src/routes/roleRoutes.js"
import branchRoutes from "./src/routes/branchRoutes.js"
import serviceType from "./src/routes/serviceType.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/serviceType", serviceType);

//get staffs
app.use("/api/staffs", staffRoutes);

//get roles
app.use("/api/roles", roleRoutes);

//get branches
app.use("/api/branches",branchRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});