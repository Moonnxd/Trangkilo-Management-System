import express from "express";
import { db } from "../db.js";

const router = express.Router();

/* Get one Staff Info, assigned branch and role */
router.get("/:id", (req, res) => {
    const sql = "SELECT s.staff_id, s.first_name, s.last_name, s.middle_initial, b.branch_name, r.role_name, s.contact_number, s.email, s.gender, s.date_hired, s.specialization, s.status , s.remarks, s.branch_id, u.role_id FROM staffs s LEFT JOIN users u ON s.user_id = u.user_id LEFT JOIN roles r ON u.role_id = r.role_id LEFT JOIN branches b ON s.branch_id = b.branch_id WHERE staff_id = ?";

    db.query(sql, [req.params.id], (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result[0]);
    });
})

/* Display Staffs Summary Details */
router.get("/", (req, res) => {
  const sql = "SELECT s.staff_id ,CONCAT(s.first_name, ' ', s.last_name) AS name, b.branch_name, r.role_name, s.status , s.contact_number, s.email FROM staffs s LEFT JOIN users u ON s.user_id = u.user_id LEFT JOIN roles r ON u.role_id = r.role_id LEFT JOIN branches b ON s.branch_id = b.branch_id";

  db.query(sql, (err, result) => {  
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

/* Add new Staff */
router.post("/", (req, res) => {
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

  const insertUserSql = `
    INSERT INTO users (email, role_id)
    VALUES (?, ?)
  `;

  const insertStaffSql = `
    INSERT INTO staffs 
    (first_name, last_name, middle_initial, contact_number, email, gender, specialization, status, remarks, branch_id, date_hired, user_id, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
  `;

  db.beginTransaction((err) => {
    if (err) return res.status(500).json(err);

    // STEP 1: INSERT USER
    db.query(insertUserSql, [email, role_id], (err, userResult) => {
      if (err) {
        return db.rollback(() => res.status(500).json(err));
      }

      const userId = userResult.insertId;

      // STEP 2: INSERT STAFF with user_id
      db.query(
        insertStaffSql,
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
        (err, staffResult) => {
          if (err) {
            console.log(db.query);
            return db.rollback(() => res.status(500).json(err));   
          }

          // SUCCESS → COMMIT
          db.commit((err) => {
            if (err) {
              return db.rollback(() => res.status(500).json(err));
            }

            res.json({
              message: "Staff created successfully",
              staff_id: staffResult.insertId,
              user_id: userId,
            });
          });
        }
      );
    });
  });
});

/* update staff details */
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
    remarks,
    branch_id,
    role_id,
    date_hired,
  } = req.body;

  const staffId = req.params.id;

  const updateStaffSql = `
    UPDATE staffs 
    SET first_name=?, last_name=?, middle_initial=?, contact_number=?, email=?, gender=?, specialization=?, status=?, remarks=?, branch_id=?, date_hired=?, updated_at=NOW()
    WHERE staff_id=?
  `;

  const updateUserSql = `
    UPDATE users 
    SET role_id=?
    WHERE user_id = (SELECT user_id FROM staffs WHERE staff_id=?)
  `;

  db.beginTransaction((err) => {
    if (err) return res.status(500).json(err);

    db.query(
      updateStaffSql,
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
      (err) => {
        if (err) {
          return db.rollback(() => res.status(500).json(err));
        }

        db.query(updateUserSql, [role_id, staffId], (err) => {
          if (err) {
            return db.rollback(() => res.status(500).json(err));
          }

          db.commit((err) => {
            if (err) {
              return db.rollback(() => res.status(500).json(err));
            }

            res.json({ message: "Staff updated successfully" });
          });
        });
      }
    );
  });
});

/* delete staff */
router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM staffs WHERE staff_id=?";

  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Staff deleted successfully" });
  });
});

export default router;