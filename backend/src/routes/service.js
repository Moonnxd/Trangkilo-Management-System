import express from "express";
<<<<<<< HEAD
import { db } from "../connection/db.js";
=======
import { db } from "../db.js";
>>>>>>> origin/pre-prod

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
      error: "Failed to fetch services",
=======
      error: "Failed to fetch services"
>>>>>>> origin/pre-prod
    });
  }
});

<<<<<<< HEAD
export default router;
=======
export default router;
>>>>>>> origin/pre-prod
