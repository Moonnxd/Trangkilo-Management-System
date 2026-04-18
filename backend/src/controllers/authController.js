import { db } from "../db.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      gender,
      contact_number,
      email,
      password,
      city,
      zone,
      barangay
    } = req.body;

    if (
      !first_name || !last_name || !gender ||
      !contact_number || !email || !password ||
      !city || !zone || !barangay
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const [existing] = await db.query(
      "SELECT * FROM customers WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [userResult] = await db.query(
      `INSERT INTO users (role_id, password)
       VALUES (?, ?)`,
      [4, hashedPassword]
    );

    const user_id = userResult.insertId;

    await db.query(
      `INSERT INTO customers
      (user_id, first_name, last_name, gender, contact_number, email, city, zone, barangay)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id,
        first_name,
        last_name,
        gender,
        contact_number,
        email,
        city,
        zone,
        barangay
      ]
    );

    res.status(201).json({
      message: "Signup successful",
      user_id
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};