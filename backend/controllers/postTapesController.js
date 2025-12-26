import { validationResult } from "express-validator";
import pool from "../database/db_connect.js";

export default async function postTapesController(req, res, next) {
  const valRes = validationResult(req);
  const { artist, title, location, year, needsRepair, speed } = req.body;

  if (valRes.isEmpty()) {
    try {
      const result = await pool.query(
        "INSERT INTO tapes(artist, title, location, year, needs_repair, speed) VALUES($1, $2, $3, $4, $5, $6) RETURNING id",
        [artist, title, location, year, needsRepair, speed],
      );
      console.log(`Tape ${title} by ${artist} has been added to the db.`);
      return res.status(201).send(result.rows[0].id);
    } catch (error) {
      return next(new Error(error));
    }
  }

  const err = new Error();
  err.message = valRes.errors;
  err.status = 400;
  return next(err);
}
