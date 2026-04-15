import express from "express";
import { db } from "../connection/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const sql = `
      SELECT 
        a.appointment_id,
        a.therapist_type AS therapist_type,
        c.first_name AS client_first_name,
        stp.service_type_name as service_type_name,
        al.hotel_name as hotel_name,
        al.room_number as room_number,
        al.landmark as landmark,
        al.house_number as house_number,
        al.zone as zone,
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
      LEFT JOIN appointment_locations al ON a.appointment_location_id = al.appointment_locations_id
      LEFT JOIN appointment_services aps ON a.appointment_id = aps.appointment_id
      LEFT JOIN service_types stp ON a.service_type_id = stp.service_type_id
      LEFT JOIN services s ON aps.services_id = s.services_id
      LEFT JOIN staffs st ON a.therapist_id = st.staff_id
    `;

    const [result] = await db.query(sql);
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let { date, start_time, status } = req.body;

    // Fix DATE
    if (date) {
      const d = new Date(date);
      date = d.toISOString().slice(0, 19).replace("T", " ");
    }

    // Fix TIME (already good from your log: 23:00:00)
    
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
    console.error(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    await connection.query(
      `DELETE FROM appointment_services WHERE appointment_id = ?`,
      [id],
    );

    await connection.query(
      `DELETE FROM appointment_locations WHERE appointment_id = ?`,
      [id],
    );

    await connection.query(
      `DELETE FROM appointments WHERE appointment_id = ?`,
      [id],
    );

    await connection.commit();

    res.json({ message: "Appointment and related data deleted successfully" });
  } catch (err) {
    await connection.rollback();

    console.error("DELETE ERROR:", err);

    res.status(500).json({
      error: "Delete failed",
      details: err.message,
    });
  } finally {
    connection.release();
  }
});

export default router;
