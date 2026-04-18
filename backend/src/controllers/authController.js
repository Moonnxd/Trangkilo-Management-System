import { db } from "../connection/db.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

export const signup = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      first_name,
      last_name,
      gender,
      contact_number,
      email,
      password,
      city,
      zone,
      barangay,
    } = req.body;

    if (
      !first_name ||
      !last_name ||
      !gender ||
      !contact_number ||
      !email ||
      !password ||
      !city ||
      !zone ||
      !barangay
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const [existing] = await db.query(
      "SELECT * FROM customers WHERE email = ?",
      [email],
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 14);

    const [userResult] = await db.query(
      `INSERT INTO users (role_id, password)
       VALUES (?, ?)`,
      [4, hashedPassword],
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
        barangay,
      ],
    );

    req.session.regenerate((err) => {
      if (err) {
        return res.status(500).json({ message: "Session error" });
      }

      req.session.userId = user_id;

      res.status(201).json({
        message: "Signup successful",
        user_id,
      });
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { identifier, email_or_mobile, password } = req.body;

    const loginValue = identifier || email_or_mobile;

    if (!loginValue || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const [rows] = await db.query(
      `SELECT users.user_id, users.password, users.role_id,
              customers.customer_id, customers.first_name, customers.last_name
       FROM users
       INNER JOIN customers ON users.user_id = customers.user_id
       WHERE customers.email = ? OR customers.contact_number = ?`,
      [loginValue, loginValue]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }


    req.session.regenerate((err) => {
      if (err) {
        return res.status(500).json({ message: "Session error" });
      }

      req.session.userId = user.user_id;

      req.session.save((err) => {
        if (err) {
          return res.status(500).json({ message: "Session save error" });
        }

        res.status(200).json({
          message: "Login successful",
          user: {
            customer_id: user.customer_id,
            name: `${user.first_name} ${user.last_name}`,
            role_id: user.role_id,
          },
        });
      });
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};