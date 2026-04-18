import express from "express";
<<<<<<< HEAD
import { db } from "../db.js";
=======
import { db } from "../connection/db.js";
>>>>>>> moonxd/main

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const sql = "SELECT * FROM services WHERE status = 'Active'";
    const [result] = await db.query(sql);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({
<<<<<<< HEAD
      error: "Failed to fetch services"
=======
      error: "Failed to fetch services",
>>>>>>> moonxd/main
    });
  }
});

<<<<<<< HEAD
export default router;
=======
export default router;
>>>>>>> moonxd/main
