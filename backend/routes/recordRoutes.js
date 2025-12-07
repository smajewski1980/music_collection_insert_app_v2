import express from "express";
const router = express.Router();
import { body } from "express-validator";
import postRecordsController from "../controllers/postRecordsController";

router.post(
  "/",
  body("artist").notEmpty().isString().escape(),
  postRecordsController,
);

export default router;
