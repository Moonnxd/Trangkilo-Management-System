import express from "express";
import { db } from "../db.js";

const router = express.Router();

/* ---------------- GET ALL STAFFS ---------------- */
router.get("/", (req, res) => {
  const sql = "SELECT * FROM staffs";

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

/* ---------------- GET ONE STAFF ---------------- */
router.get("/:id", (req, res) => {
  const sql = "SELECT * FROM staffs WHERE staff_id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
});

/* ---------------- UPDATE STAFF ---------------- */
router.put("/:id", (req, res) => {
  const {
    first_name,
    last_name,
    middle_initial,
    contact_number,
    email,
    gender,
    specialization,
    status,
  } = req.body;

  const sql = `
    UPDATE staffs 
    SET first_name=?, last_name=?, middle_initial=?, contact_number=?, email=?, gender=?, specialization=?, status=?
    WHERE staff_id=?
  `;

  db.query(
    sql,
    [
      first_name,
      last_name,
      middle_initial,
      contact_number,
      email,
      gender,
      specialization,
      status,
      req.params.id,
    ],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Staff updated successfully" });
    }
  );
});

/* ---------------- DELETE STAFF ---------------- */
router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM staffs WHERE staff_id=?";

  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Staff deleted successfully" });
  });
});

export default router;