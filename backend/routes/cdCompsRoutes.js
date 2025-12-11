import express from "express";
const router = express.Router();
import { body } from "express-validator";
import postCdCompsController from "../controllers/postCdCompsController.js";

function isActualNumber(value) {
  if (typeof value !== "number") {
    throw new Error("Input must be of type number");
  }
  return true;
}

router.post(
  "/",
  body("title")
    .exists()
    .notEmpty()
    .withMessage("Title can not be empty")
    .isString()
    .escape(),
  body("year")
    .exists()
    .withMessage("Year can not be null")
    .custom(isActualNumber)
    .withMessage("Year must be a number")
    .isLength({ min: 4, max: 4 })
    .escape(),
  body("location")
    .exists()
    .notEmpty()
    .withMessage("Location can not be empty")
    .isString()
    .escape(),
  body("tracks").exists().isArray({ min: 1 }).escape(),
  body("tracks"[0].artist)
    .exists()
    .isString()
    .notEmpty()
    .withMessage("Track Artist can not be empty")
    .escape(),
  postCdCompsController,
);

export default router;
