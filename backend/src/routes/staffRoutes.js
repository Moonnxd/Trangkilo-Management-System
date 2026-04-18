import express from "express";
import { db } from "../db.js";

const router = express.Router();

/* Display Staffs Summary Details */
router.get("/", async (req, res) => {
  try {
    const sql = "SELECT s.staff_id ,CONCAT(s.first_name, ' ', s.last_name) AS name, b.branch_name, r.role_name, s.status , s.contact_number, s.email FROM staffs s LEFT JOIN roles r ON s.role_id = r.role_id LEFT JOIN branches b ON s.branch_id = b.branch_id";
    const [result] = await db.query(sql);
    res.json (result);
  }catch (err){
    res.status(500).json(err);
  }
});

/* Get one Staff Info, assigned branch and role */
router.get("/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const sql = "SELECT s.staff_id, s.first_name, s.last_name, s.middle_initial, b.branch_name, r.role_name, s.contact_number, s.email, s.gender, s.date_hired, s.specialization, s.status , s.remarks, s.branch_id, r.role_id FROM staffs s LEFT JOIN roles r ON s.role_id = r.role_id LEFT JOIN branches b ON s.branch_id = b.branch_id WHERE staff_id = ?";
    const [result] = await db.query(sql, [id]);
    res.json(result[0]);
  }catch (err) {
    res.status(500).json(err);
  }
})

/* Add new Staff */
router.post("/", async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      middle_initial,
      contact_number,
      email,
      gender,
      specialization,
      status,
      remarks,
      branch_id,
      role_id,
      date_hired,
    } = req.body;
  
    const sql = `
      INSERT INTO staffs 
      (first_name, last_name, middle_initial, contact_number, email, gender, specialization, status, remarks, branch_id, role_id, date_hired, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `;

    const[result] = await db.query(sql, [
      first_name,
      last_name,
      middle_initial,
      contact_number,
      email,
      gender,
      specialization,
      status,
      remarks,
      branch_id,
      role_id,
      date_hired,
    ]);
    res.json({
      message: "Staff added successfully",
      staffId: result.insertId,
    })
  }catch (err) {
    res.status(500).json(err);
  }
})

/* update staff details */
router.put("/:id", async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      middle_initial,
      contact_number,
      email,
      gender,
      specialization,
      status,
      remarks,
      branch_id,
      role_id,
      date_hired,
    } = req.body;
  
    const staffId = req.params.id;
  
    const sql = `
      UPDATE staffs 
      SET first_name=?, 
          last_name=?, 
          middle_initial=?, 
          contact_number=?, 
          email=?, 
          gender=?, 
          specialization=?, 
          status=?, 
          remarks=?, 
          branch_id=?, 
          role_id=?, 
          date_hired=?, 
          updated_at=NOW()
      WHERE staff_id=?
    `;
    
    const [result] = await db.query(sql, [
      first_name,
      last_name,
      middle_initial,
      contact_number,
      email,
      gender,
      specialization,
      status,
      remarks,
      branch_id,
      role_id,
      date_hired,
      staffId
    ])
    res.json(result);
  }catch (err) {
    res.status(500).json(err);
  }
})

/* delete staff */
router.delete("/:id", async (req, res) => {
  try {
    const sql = "DELETE FROM staffs WHERE staff_id=?";
    const [result] = await db.query(sql, [req.params.id]);

    if(result.affectedRows === 0) {
      return res.status(404).json({ message: "Staff not found."})
    }
    res.json({ message : "Staff deleted successfully"})
  }catch (err) {
    res.status(500).json(err);
  }
})

export default router;
