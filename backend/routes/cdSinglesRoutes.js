import express from "express";
const router = express.Router();
import { body } from "express-validator";
import postCdSinglesContoller from "../controllers/postCdSinglesController.js";

router.post(
  "/",
  body("artist").exists().notEmpty().isString().escape(),
  postCdSinglesContoller,
);

export default router;
