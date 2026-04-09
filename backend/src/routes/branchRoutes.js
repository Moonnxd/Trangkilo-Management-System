import express from "express";
import { db } from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
    const sql = "SELECT branch_id, branch_name FROM branches";
  
    db.query(sql, (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    });
  });


export default router;