// import dotenv from "dotenv";
// dotenv.config();

// import express from "express";
// import cors from "cors";

// //routes
// import staffRoutes from "./src/routes/staffRoutes.js"
// import roleRoutes from "./src/routes/roleRoutes.js"
// import branchRoutes from "./src/routes/branchRoutes.js"
// import appointmentRoutes from "./src/routes/appointmentRoutes.js";
// import serviceType from "./src/routes/serviceType.js";
// import authRoutes from "./src/routes/authRoutes.js";
// import loginRouter from "./src/routes/loginRoutes.js";
// import insertRoutes from "./src/routes/insert.js";
// import service from "./src/routes/service.js";
// import sessionMiddleware from "./src/connection/session.js";

// const app = express();

// // Middleware
// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true
// }));

// app.use(express.json());

// app.use(sessionMiddleware);

// app.use(authRoutes);

// app.use("/profile", authRoutes);

// app.get("/test-session", (req, res) => {
//   if (req.session.userId) {
//     return res.json({ message: "Session works", userId: req.session.userId });
//   } else {
//     return res.status(401).json({ message: "No session" });
//   }
// });

// app.use("/serviceType", serviceType);

// app.use("/services", service);

// app.use("/loginroute", loginRouter);

// app.use("/", authRoutes);

// app.use("/booking", insertRoutes);

// app.use("/api/appointments", appointmentRoutes);

// //get staffs
// app.use("/staffs", staffRoutes);

// //get roles
// app.use("/api/roles", roleRoutes);

// //get branches
// app.use("/branches",branchRoutes);

// // Test route
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });



// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { createServer } from "http";        // ← change from require
import { Server } from "socket.io";         // ← change from require

// routes
import staffRoutes from "./src/routes/staffRoutes.js"
import roleRoutes from "./src/routes/roleRoutes.js"
import branchRoutes from "./src/routes/branchRoutes.js"
import serviceType from "./src/routes/serviceType.js";
import appointmentRoutes from "./src/routes/appointmentRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import loginRouter from "./src/routes/loginRoutes.js";
import insertRoutes from "./src/routes/insert.js";
import service from "./src/routes/service.js";
import sessionMiddleware from "./src/connection/session.js";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",   // match your frontend URL
    credentials: true
  }
});

io.on('connection', (socket) => {
  socket.on('join:admin', () => {
    socket.join('admins');
    console.log('Admin joined:', socket.id);
  });
});

export { io };   // ← export so your booking router can use it

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(sessionMiddleware);

// Routes (all your existing ones — no changes)
app.use(authRoutes);
app.use("/profile", authRoutes);
app.use("/serviceType", serviceType);
app.use("/services", service);
app.use("/loginroute", loginRouter);
app.use("/", authRoutes);
app.use("/booking", insertRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/staffs", staffRoutes);
app.use("/api/roles", roleRoutes);
app.use("/branches", branchRoutes);

app.get("/test-session", (req, res) => {
  if (req.session.userId) {
    return res.json({ message: "Session works", userId: req.session.userId });
  } else {
    return res.status(401).json({ message: "No session" });
  }
});

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});