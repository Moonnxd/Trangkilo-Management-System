import { body } from "express-validator";

export const signupValidator = [
  body("email").isEmail().normalizeEmail(),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Min 8 chars")
    .matches(/^[A-Za-z0-9]+$/)
    .withMessage("No special characters allowed")
    .matches(/[A-Z]/)
    .matches(/[a-z]/)
    .matches(/[0-9]/),
];