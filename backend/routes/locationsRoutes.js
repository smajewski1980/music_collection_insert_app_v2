import express from "express";
const router = express.Router();
import getLocationsController from "../controllers/getLocationsController.js";

router.get("/", getLocationsController);

export default router;
