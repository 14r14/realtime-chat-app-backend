import express from "express";

import { body } from "express-validator";

const router = express.Router();

import authControllers = require("../controllers/auth.controllers");

router.post(
  "/register",
  [
    body("username")
      .notEmpty()
      .withMessage("required")
      .isLength({ min: 3 })
      .withMessage("minlength")
      .isLength({ max: 20 })
      .withMessage("maxlength")
      .trim(),
    body("email")
      .notEmpty()
      .withMessage("required")
      .isEmail()
      .withMessage("pattern")
      .normalizeEmail()
      .trim(),
    body("password")
      .notEmpty()
      .withMessage("required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "i"
      )
      .withMessage("pattern")
      .trim(),
    body("confirmPassword")
      .notEmpty()
      .withMessage("required")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("nomatch");
        }
        return true;
      }),
  ],
  authControllers.postRegisterController
);

router.post(
  "/login",
  [
    body("email")
      .notEmpty()
      .withMessage("required")
      .isEmail()
      .withMessage("pattern")
      .normalizeEmail()
      .trim(),
    body("password")
      .notEmpty()
      .withMessage("required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "i"
      )
      .withMessage("pattern")
      .trim(),
  ],
  authControllers.postLoginController
);

export = router;
