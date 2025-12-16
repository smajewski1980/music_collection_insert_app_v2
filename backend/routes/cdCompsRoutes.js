import express from "express";
const router = express.Router();
import { body } from "express-validator";
import postCdCompsController from "../controllers/postCdCompsController.js";
import isActualNumber from "../utilities/isActualNumber.js";

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
    .isString(),
  body("year")
    .exists()
    .withMessage("Year can not be null")
    .custom(isActualNumber)
    .withMessage("Year must be a number")
    .isLength({ min: 4, max: 4 }),
  body("location")
    .exists()
    .notEmpty()
    .withMessage("Location can not be empty")
    .isString(),
  body("tracks").exists().isArray({ min: 1 }).escape(),
  body("tracks.*").custom((val, { req }) => {
    const artist = val.split(",")[0];
    const track = val.split(",")[1];
    if (artist === "") {
      throw new Error("Artist must not be empty.");
    }
    if (track === "") {
      throw new Error("Track must not be empty.");
    }

    return true;
  }),
  postCdCompsController,
);

export default router;
