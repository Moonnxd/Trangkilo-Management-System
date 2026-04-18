import express from "express";
<<<<<<< HEAD
import { db } from "../connection/db.js";
=======
import { db } from "../db.js";
>>>>>>> origin/pre-prod

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const sql = "SELECT service_type_name FROM service_types";
    const [result] = await db.query(sql);
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

<<<<<<< HEAD
export default router;
=======
export default router;
>>>>>>> origin/pre-prod
