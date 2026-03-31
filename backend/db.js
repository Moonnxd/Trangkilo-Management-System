import mysql from "mysql2";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "trangkilo_db",
});

db.connect((err) => {
  if (err) {
    console.log("DB connection failed:", err);
  } else {
    console.log("Database connected");
  }
});