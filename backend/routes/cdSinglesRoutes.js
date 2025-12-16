import express from "express";
const router = express.Router();
import { body } from "express-validator";
import postCdSinglesContoller from "../controllers/postCdSinglesController.js";
import isActualNumber from "../utilities/isActualNumber.js";

router.post(
  "/",
  body("artist")
    .exists()
    .notEmpty()
    .withMessage("Artist can not be empty")
    .isString(),
  body("title")
    .exists()
    .notEmpty()
    .withMessage("Title can not be empty")
    .isString(),
  body("year")
    .exists()
    .notEmpty()
    .withMessage("Year can not be empty")
    .isLength({ min: 4, max: 4 })
    .withMessage("Year must be four digits")
    .custom(isActualNumber)
    .withMessage("Year must be a valid number"),
  body("caseType").exists().notEmpty().isString(),
  body("tracks").exists().isArray({ min: 1 }),
  body("tracks.*")
    .notEmpty()
    .withMessage("Track name can not be empty")
    .isString(),
  postCdSinglesContoller,
);

export default router;
