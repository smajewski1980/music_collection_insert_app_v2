import express from "express";
const router = express.Router();
import { body } from "express-validator";
import postCdsMainController from "../controllers/postCdsMainController.js";

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
    .escape(),
  postCdsMainController,
);

export default router;
