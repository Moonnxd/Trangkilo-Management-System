import express from "express";
import { db } from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const sql = `
      SELECT 
        a.appointment_id,
        c.first_name AS client_first_name,
        c.last_name AS client_last_name,
        s.service_name AS service,
        CONCAT(st.first_name, ' ', st.last_name) AS therapist,
        a.appointment_date AS date,
        a.start_time,
        aps.duration_minutes AS duration,
        aps.price,
        a.status
      FROM appointments a
      LEFT JOIN customers c ON a.customer_id = c.customer_id
      LEFT JOIN appointment_services aps ON a.appointment_id = aps.appointment_id
      LEFT JOIN services s ON aps.services_id = s.services_id
      LEFT JOIN staffs st ON a.therapist_id = st.staff_id
    `;

    const [result] = await db.query(sql);
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* Update Appointment */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { date, start_time, status } = req.body;

    const sql = `
      UPDATE appointments
      SET 
        appointment_date = ?,
        start_time = ?,
        status = ?
      WHERE appointment_id = ?
    `;

    await db.query(sql, [date, start_time, status, id]);

    res.json({ message: "Appointment updated" });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;