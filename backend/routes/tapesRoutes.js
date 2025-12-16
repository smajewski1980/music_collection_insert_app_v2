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
  if (val === "3 3/4" || val === "7 1/4" || val === "na") {
    return true;
  }
  throw new Error("speed can only be 3 3/4, 7 1/4 or na");
}

router.post(
  "/",
  body("artist")
    .exists()
    .notEmpty()
    .withMessage("artist can not be empty")
    .isString()
    .escape(),
  body("title")
    .exists()
    .notEmpty()
    .withMessage("title can not be empty")
    .isString()
    .escape(),
  body("location")
    .exists()
    .notEmpty()
    .withMessage("location can not be empty")
    .isString()
    .escape(),
  body("year")
    .exists()
    .notEmpty()
    .withMessage("year can not be empty")
    .isLength({ min: 4, max: 4 })
    .custom(isActualNumber)
    .escape(),
  body("needsRepair").exists().custom(validateNeedsRepair).escape(),
  body("speed").exists().custom(validateSpeed).escape(),
  postTapesController,
);

export default router;
