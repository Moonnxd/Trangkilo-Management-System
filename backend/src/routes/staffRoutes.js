import express from "express";
import { db } from "../connection/db.js";

const router = express.Router();

<<<<<<< HEAD
router.get("/therapist", async (req, res) => {
  try {
    const sql = `SELECT * FROM staffs`;

    const [result] = await db.query(sql);
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* Get one Staff */
router.get("/:id", async (req, res) => {
  try {
    const sql = `SELECT s.staff_id, s.first_name, s.last_name, s.middle_initial, b.branch_name, r.role_name, s.contact_number, s.email, s.gender, s.date_hired, s.specialization, s.status , s.remarks, s.branch_id, u.role_id 
    FROM staffs s 
    LEFT JOIN users u ON s.user_id = u.user_id 
    LEFT JOIN roles r ON u.role_id = r.role_id 
    LEFT JOIN branches b ON s.branch_id = b.branch_id 
    WHERE staff_id = ?`;

    const [result] = await db.query(sql, [req.params.id]);
    res.json(result[0]);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* Get all staffs */
router.get("/", async (req, res) => {
  try {
    const sql = `SELECT s.staff_id ,CONCAT(s.first_name, ' ', s.last_name) AS name, b.branch_name, r.role_name, s.status , s.contact_number, s.email 
    FROM staffs s 
    LEFT JOIN users u ON s.user_id = u.user_id 
    LEFT JOIN roles r ON u.role_id = r.role_id 
    LEFT JOIN branches b ON s.branch_id = b.branch_id`;

    const [result] = await db.query(sql);
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get therapist name

/* Add Staff */
router.post("/", async (req, res) => {
  const connection = await db.getConnection();

  try {
    const {
=======
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
>>>>>>> origin/pre-prod
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
<<<<<<< HEAD
    } = req.body;

    await connection.beginTransaction();

    const [userResult] = await connection.query(
      `INSERT INTO users (email, role_id) VALUES (?, ?)`,
      [email, role_id],
    );

    const userId = userResult.insertId;

    const [staffResult] = await connection.query(
      `INSERT INTO staffs 
      (first_name, last_name, middle_initial, contact_number, email, gender, specialization, status, remarks, branch_id, date_hired, user_id, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
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
        date_hired,
        userId,
      ],
    );

    await connection.commit();

    res.json({
      message: "Staff created successfully",
      staff_id: staffResult.insertId,
      user_id: userId,
    });
  } catch (err) {
    await connection.rollback();
    res.status(500).json(err);
  } finally {
    connection.release();
  }
});

/* Update Staff */
router.put("/:id", async (req, res) => {
  const connection = await db.getConnection();

  try {
    const staffId = req.params.id;
=======
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
>>>>>>> origin/pre-prod
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
<<<<<<< HEAD

    await connection.beginTransaction();

    await connection.query(
      `UPDATE staffs 
       SET first_name=?, last_name=?, middle_initial=?, contact_number=?, email=?, gender=?, specialization=?, status=?, remarks=?, branch_id=?, date_hired=?, updated_at=NOW()
       WHERE staff_id=?`,
      [
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
        date_hired,
        staffId,
      ],
    );

    await connection.query(
      `UPDATE users 
       SET role_id=?
       WHERE user_id = (SELECT user_id FROM staffs WHERE staff_id=?)`,
      [role_id, staffId],
    );

    await connection.commit();

    res.json({ message: "Staff updated successfully" });
  } catch (err) {
    await connection.rollback();
    res.status(500).json(err);
  } finally {
    connection.release();
  }
});

/* Delete Staff */
router.delete("/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM staffs WHERE staff_id=?", [req.params.id]);
    res.json({ message: "Staff deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});
=======
  
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
>>>>>>> origin/pre-prod

export default router;
