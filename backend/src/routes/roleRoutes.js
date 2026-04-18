import express from "express";
import { db } from "../connection/db.js";

const router = express.Router();

<<<<<<< HEAD
/* Get all roles */
router.get("/", async (req, res) => {
  try {
    const sql = "SELECT * FROM roles";
    const [result] = await db.query(sql);
    res.json(result);
  }catch (err) {
    res.status(500).json(err);
  }
})

/* Get one role Info */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const sql = "SELECT * FROM roles WHERE role_id = ?";
    const [result] = await db.query(sql, [id]);
    res.json(result[0]);
  }catch (err) {
    res.status(500).json(err);
  }
})

/* Add new role */
router.post("/", async (req, res) => {
  try {
    const {
      role_name,
      description,
    } = req.body;

    const sql = `
        INSERT INTO roles 
        (role_name, description, created_at)
        VALUES (?, ?, NOW())
    `;

    const [result] = await db.query(sql, [
      role_name,
      description,
    ]);
    res.json({
      message : "Role added successfully", 
      role_id: result.insertId,
    });
  }catch (err) {
    res.status(500).json(err);
  }
})

/* update role details */
router.put("/:id", async (req, res) => {
  try {
    const {
      role_name,
      description,
    } = req.body;

    const roleId = req.params.id;

    const sql = `
      UPDATE roles 
      SET role_name=?, 
          description=?, 
          updated_at=NOW()
      WHERE role_id=?
    `;

    const [result] = await db.query (sql, [
      role_name,
      description,
      roleId,
    ])
    res.json(result);
  }catch (err) {
    res.status(500).json(err);
  }
})

/* delete role */
router.delete("/:id", async (req, res) => {
  try {
    const sql = "DELETE FROM roles WHERE role_id=?";
    const [result] = await db.query(sql, [req.params.id]);
    if(result.affectedRows === 0) {
      return res.status(404).json({ message: "Role not found"});
    }
    res.json({ message : "Role deleted successfully"});
  }catch (err){
    res.status(500).json(err);
  }
})

export default router;  
=======
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
>>>>>>> moonxd/main
