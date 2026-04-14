import express from "express";
import { db } from "../connection/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const sql = "SELECT branch_id, branch_name FROM branches";
    const [result] = await db.query(sql);
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
