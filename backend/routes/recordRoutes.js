import express from "express";
const router = express.Router();
import { body } from "express-validator";
import postRecordsController from "../controllers/postRecordsController.js";
import isActualNumber from "../utilities/isActualNumber.js";

router.post(
  "/",
  body("artist")
    .exists()
    .notEmpty()
    .withMessage("Artist can not be empty")
    .isString()
    .escape(),
  body("title")
    .exists()
    .notEmpty()
    .withMessage("Title can not be empty")
    .isString()
    .escape(),
  body("location")
    .exists()
    .notEmpty()
    .withMessage("Location can not be empty")
    .isString()
    .escape(),
  body("year")
    .exists()
    .withMessage("Year can not be null")
    .custom(isActualNumber)
    .withMessage("Year must be a number")
    .isLength({ min: 4, max: 4 })
    .escape(),
  body("diameter")
    .exists()
    .notEmpty()
    .withMessage("Diameter field can not be empty")
    .isString()
    .escape(),
  body("sleeve_condition")
    .exists()
    .notEmpty()
    .matches(/^\*+$/)
    .withMessage("Field may only contain *")
    .isLength({ min: 1, max: 5 })
    .withMessage("Field must contain between 1 and 5 stars")
    .escape(),
  body("record_condition")
    .exists()
    .notEmpty()
    .matches(/^\*+$/)
    .withMessage("Field may only contain *")
    .isLength({ min: 1, max: 5 })
    .withMessage("Field must contain between 1 and 5 stars")
    .escape(),
  body("label")
    .exists()
    .notEmpty()
    .withMessage("Label field can not be empty.")
    .isString()
    .escape(),
  postRecordsController,
);

export default router;
