import { db } from "../db.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  try {
    const { identifier, email_or_mobile, password } = req.body;

    const loginValue = identifier || email_or_mobile;

    if (!loginValue || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const [customerRows] = await db.query(
      `SELECT * FROM customers WHERE email = ? OR contact_number = ?`,
      [loginValue, loginValue]
    );

    if (customerRows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const customer = customerRows[0];

    if (!customer.user_id) {
      return res.status(400).json({ message: "No account linked" });
    }

    // get user credentials
    const [userRows] = await db.query(
      `SELECT * FROM users WHERE user_id = ?`,
      [customer.user_id]
    );

    const user = userRows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        customer_id: customer.customer_id,
        name: `${customer.first_name} ${customer.last_name}`,
        role_id: user.role_id
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};