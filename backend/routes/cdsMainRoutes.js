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
    .isString(),
  body("title")
    .exists()
    .notEmpty()
    .withMessage("title can not be empty")
    .isString(),
  body("location").exists().notEmpty().withMessage("location can not be empty"),
  postCdsMainController,
);

export default router;
