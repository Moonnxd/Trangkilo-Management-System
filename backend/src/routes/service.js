import express from "express";
import { db } from "../connection/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const sql = "SELECT * FROM services WHERE status = 'Active'";
    const [result] = await db.query(sql);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Failed to fetch services",
    });
  }
});

export default router;
