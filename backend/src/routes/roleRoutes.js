import express from "express";
import { db } from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const sql = "SELECT role_id, role_name FROM roles";
    const [result] = await db.query(sql);
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;