import express from "express";
const router = express.Router();
import { body } from "express-validator";
import postTapesController from "../controllers/postTapesController.js";
import isActualNumber from "../utilities/isActualNumber.js";

function validateNeedsRepair(val) {
  if (val === "Yes" || val === "No" || val === "na") {
    return true;
  }
  throw new Error("needs repair field can only be Yes, No or na");
}

function validateSpeed(val) {
  if (val === "3 3/4 ips" || val === "7 1/4 ips" || val === "na") {
    return true;
  }
  throw new Error("speed can only be 3 3/4 ips, 7 1/4 ips or na");
}

router.post(
  "/",
  body("artist")
    .exists()
    .notEmpty()
    .withMessage("artist can not be empty")
    .isString(),
  body("title")
    .exists()
    .notEmpty()
    .withMessage("title can not be empty")
    .isString(),
  body("location")
    .exists()
    .notEmpty()
    .withMessage("location can not be empty")
    .isString(),
  body("year")
    .exists()
    .notEmpty()
    .withMessage("year can not be empty")
    .isLength({ min: 4, max: 4 })
    .custom(isActualNumber),
  body("needsRepair").exists().custom(validateNeedsRepair),
  body("speed").exists().custom(validateSpeed),
  postTapesController,
);

export default router;
