const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  try {
    const sql = "SELECT first_name, gender FROM staffs";

    const [result] = await db.query(sql);

    res.json(result);

  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;