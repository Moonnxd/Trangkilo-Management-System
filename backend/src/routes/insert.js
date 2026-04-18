import express from "express";
<<<<<<< HEAD
import { db } from "../db.js";
=======
import { db } from "../connection/db.js";
>>>>>>> moonxd/main

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
<<<<<<< HEAD
        data.location.zone || '',
        data.location.barangay,
        data.location.city,
        data.location.province
      ]
=======
        data.location.zone || "",
        data.location.barangay,
        data.location.city,
        data.location.province,
      ],
>>>>>>> moonxd/main
    );

    const customer_id = customerResult.insertId;

    const serviceTypeMap = {
      "Home Service": 1,
      "Hotel Service": 2,
<<<<<<< HEAD
      "Branch Visit": 3
=======
      "Branch Visit": 3,
>>>>>>> moonxd/main
    };

    const service_type_id = serviceTypeMap[data.serviceType];

    if (!service_type_id) {
      throw new Error("Invalid service type");
    }

    let totalDuration = 0;

    for (const s of data.services) {
      totalDuration += Number(s.duration || 0);
    }

<<<<<<< HEAD
    const startTime = data.time;
    const start = new Date(`1970-01-01T${startTime}`);
    start.setMinutes(start.getMinutes() + totalDuration);

=======
    const startTime = convertTo24Hour(data.time);
    const start = new Date(`1970-01-01T${startTime}`);
    start.setMinutes(start.getMinutes() + totalDuration);

    function convertTo24Hour(timeStr) {
  const parts = timeStr.trim().split(" ");
  const modifier = parts[1]; // AM, PM, or NN
  const [rawHours, minutes] = parts[0].split(":");
  let hours = parseInt(rawHours);

  if (modifier === "NN") hours = 12;
  else if (modifier === "AM") hours = hours === 12 ? 0 : hours;
  else if (modifier === "PM") hours = hours === 12 ? 12 : hours + 12;

  return `${String(hours).padStart(2, "0")}:${minutes}:00`;
}

>>>>>>> moonxd/main
    const end_time = start.toTimeString().slice(0, 8);

    const therapist_id = data.therapist_id;
    const branch_id = data.branch.branch_id;
    const therapist_type = data.therapist_type;
<<<<<<< HEAD
=======
    const appointment_date = data.date.slice(0, 10);
>>>>>>> moonxd/main

    const [appointmentResult] = await connection.query(
      `INSERT INTO appointments 
      (customer_id, therapist_id, therapist_type, service_type_id, branch_id, appointment_location_id, appointment_date, start_time, end_time, duration_minutes, appointment_code)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        customer_id,
<<<<<<< HEAD
        therapist_id,
=======
        therapist_id || null,
>>>>>>> moonxd/main
        therapist_type,
        service_type_id,
        branch_id,
        null,
<<<<<<< HEAD
        data.date,
        data.time,
        end_time,
        totalDuration,
        "APT" + Date.now()
      ]
=======
        appointment_date,
        startTime,
        end_time,
        totalDuration,
        "APT" + Date.now(),
      ],
>>>>>>> moonxd/main
    );

    const appointment_id = appointmentResult.insertId;

    let appointment_location_id = null;

    if (data.serviceType !== "Branch Visit") {
      const [locationResult] = await connection.query(
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
<<<<<<< HEAD
          data.location.note
        ]
=======
          data.location.note,
        ],
>>>>>>> moonxd/main
      );

      appointment_location_id = locationResult.insertId;
    }

    if (appointment_location_id) {
<<<<<<< HEAD
        await connection.query(
          `UPDATE appointments 
           SET appointment_location_id = ? 
           WHERE appointment_id = ?`,
          [appointment_location_id, appointment_id]
        );
      }

=======
      await connection.query(
        `UPDATE appointments 
           SET appointment_location_id = ? 
           WHERE appointment_id = ?`,
        [appointment_location_id, appointment_id],
      );
    }
>>>>>>> moonxd/main

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
<<<<<<< HEAD
          service.pax || 1
        ]
=======
          service.pax || 1,
        ],
>>>>>>> moonxd/main
      );
    }

    await connection.commit();

    res.json({
      message: "Booking created successfully",
<<<<<<< HEAD
      appointment_id
    });

=======
      appointment_id,
    });
>>>>>>> moonxd/main
  } catch (err) {
    await connection.rollback();

    console.error("BOOKING ERROR:", err);

    res.status(500).json({
      error: "Booking failed",
<<<<<<< HEAD
      details: err.message
    });

=======
      details: err.message,
    });
>>>>>>> moonxd/main
  } finally {
    connection.release();
  }
});

<<<<<<< HEAD
export default router;
=======
export default router;
>>>>>>> moonxd/main
