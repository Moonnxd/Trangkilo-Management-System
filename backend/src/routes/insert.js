import express from "express";
import { db } from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const data = req.body;

  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();
    const [customerResult] = await connection.query(
      `INSERT INTO customers 
      (first_name, last_name, gender, contact_number, email, zone, barangay, city, province)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.customer.firstName,
        data.customer.lastName,
        data.customer.gender,
        data.customer.mobile,
        data.customer.email,
        data.location.zone || '',
        data.location.barangay,
        data.location.city,
        data.location.province
      ]
    );

    const customer_id = customerResult.insertId;

    const serviceTypeMap = {
      "Home Service": 1,
      "Hotel Service": 2,
      "Branch Visit": 3
    };

    const service_type_id = serviceTypeMap[data.serviceType];

    if (!service_type_id) {
      throw new Error("Invalid service type");
    }

    let totalDuration = 0;

    for (const s of data.services) {
      totalDuration += Number(s.duration || 0);
    }

    const startTime = data.time;
    const start = new Date(`1970-01-01T${startTime}`);
    start.setMinutes(start.getMinutes() + totalDuration);

    const end_time = start.toTimeString().slice(0, 8);

    const [appointmentResult] = await connection.query(
      `INSERT INTO appointments 
      (customer_id, therapist_id, service_type_id, branch_id, appointment_date, start_time, end_time, duration_minutes, appointment_code)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        customer_id,
        data.therapist,
        service_type_id,
        data.branch || null,
        data.date,
        data.time,
        end_time,
        totalDuration,
        "APT" + Date.now()
      ]
    );

    const appointment_id = appointmentResult.insertId;

    if (data.serviceType !== "Branch Visit") {
      await connection.query(
        `INSERT INTO appointment_locations 
        (appointment_id, house_number, zone, barangay, city, province, hotel_name, room_number, landmark, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          appointment_id,
          data.location.houseNumber,
          data.location.zone,
          data.location.barangay,
          data.location.city,
          data.location.province,
          data.location.hotelName,
          data.location.roomNumber,
          data.location.landmark,
          data.location.note
        ]
      );
    }

    for (const service of data.services) {
      await connection.query(
        `INSERT INTO appointment_services 
        (appointment_id, services_id, price, duration_minutes, number_of_pax)
        VALUES (?, ?, ?, ?, ?)`,
        [
          appointment_id,
          service.id,
          service.price,
          service.duration,
          service.pax || 1
        ]
      );
    }

    await connection.commit();

    res.json({
      message: "Booking created successfully",
      appointment_id
    });

  } catch (err) {
    await connection.rollback();

    console.error("BOOKING ERROR:", err);

    res.status(500).json({
      error: "Booking failed",
      details: err.message
    });

  } finally {
    connection.release();
  }
});

export default router;