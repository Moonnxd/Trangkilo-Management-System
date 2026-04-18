import express from "express";
import { db } from "../connection/db.js";

const router = express.Router();

//display all branches with concat address
router.get("/", async (req, res) => {
  try {
    const sql = "SELECT branch_id, branch_name, CONCAT('Zone ',zone, ', Barangay ', barangay, ', ' , city, ' City, ' , province) AS address,contact_number, email,  status FROM branches";
    const [result] = await db.query(sql);
    res.json (result);
  }catch (err) {
    res.status(500).json(err);
  }
});

//display sales summary per branch
router.get("/branchSalesSummary", async (req, res) => {
  try {
    const sql = `
      SELECT 
          b.branch_id,
          b.branch_name,
          COUNT(DISTINCT a.appointment_id) AS total_appointments,
          COALESCE(SUM(aps.number_of_pax), 0) AS total_services,
          COALESCE(SUM(s.total_amount), 0) AS total_sales
      FROM branches b
      LEFT JOIN appointments a 
          ON b.branch_id = a.branch_id
          AND a.status = 'Completed'
      LEFT JOIN appointment_services aps
          ON a.appointment_id = aps.appointment_id
      LEFT JOIN sales s 
          ON a.appointment_id = s.appointment_id
          AND s.sales_status = 'Completed'
      GROUP BY b.branch_id, b.branch_name
      ORDER BY total_sales DESC
    `;
    const [result] = await db.query(sql);
    res.json(result);    
  } catch (err) {
    res.status(500).json(err);
  }
});

//display branch details
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const sql = "SELECT * FROM branches WHERE branch_id = ?";
    const [result] = await db.query(sql , [id]);
    res.json(result[0]);
  }catch (err) {
    res.status(500).json(err);
  }
})

/* Add new branch */
router.post("/", async (req, res) => {
  try {
    const {
      branch_name,
      zone,
      barangay,
      city,
      province,
      landmark,
      contact_number,
      email,
      opening_time,
      closing_time,
      status,
    } = req.body;

    const sql = `
      INSERT INTO branches 
      (branch_name, zone, barangay, city, province, landmark,  contact_number, email, opening_time, closing_time, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `;

    const [result] = await db.query(sql, [
      branch_name,
      zone,
      barangay,
      city,
      province,
      landmark,
      contact_number,
      email,
      opening_time,
      closing_time,
      status,
    ]);
    res.json({
      message: "Branch added successfully",
      branch_id: result.insertId,
    });
  }catch (err) {
    res.status(500).json(err);
  }
});

//update branch details
router.put("/:id", async (req, res) => {
  try {
    const {
      branch_name,
      zone,
      barangay,
      city,
      province,
      landmark,
      contact_number,
      email,
      opening_time,
      closing_time,
      status,
    } = req.body;

    const branchId = req.params.id;

    const sql = `
      UPDATE branches 
      SET branch_name=?, 
          zone=?, 
          barangay=?, 
          city=?, 
          province=?, 
          landmark=?, 
          contact_number=?, 
          email=?,
          opening_time=?,
          closing_time=?,
          status=?, 
          updated_at=NOW()
      WHERE branch_id=?
    `;

    const [result] = await db.query(sql, [
      branch_name,
      zone,
      barangay,
      city,
      province,
      landmark,
      contact_number,
      email,
      opening_time,
      closing_time,
      status,
      branchId
    ])
    res.json(result);
  }catch (err) {
    res.status(500).json(err);
  }
});

/* delete branch */
router.delete("/:id", async (req, res) => {

  try {
    const sql = "DELETE FROM branches WHERE branch_id=?";
    const [result] = await db.query(sql, [req.params.id]);
    if(result.affectedRows === 0) {
      return res.status(404).json({ message: "Branch not found"});
    }
    res.json({ message : "Branch deleted successfully"});
  }catch (err) {
    res.status(500).json(err);
  }
});

export default router;
