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

function checkArtist(value) {
  console.log(value);
  if (typeof value.artist === "number") {
    throw new Error("All track data must be of type string.");
  }
  if (!value || !value.artist) {
    throw new Error("All tracks must have an artist");
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
  body("tracks.*")
    .custom((val, { req }) => {
      const artist = val.split(",")[0];
      const track = val.split(",")[1];
      if (artist === "") {
        throw new Error("Artist must not be empty.");
      }
      if (track === "") {
        throw new Error("Track must not be empty.");
      }

      return true;
    })
    .escape(),
  postCdCompsController,
);

export default router;
