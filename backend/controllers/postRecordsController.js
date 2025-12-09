import { validationResult } from "express-validator";
import pool from "../database/db_connect";

export default async function postRecordsController(req, res, next) {
  const valRes = validationResult(req);
  const {
    artist,
    title,
    location,
    year,
    diameter,
    sleeve_condition,
    record_condition,
    label,
  } = req.body;

  if (valRes.isEmpty()) {
    try {
      const result = await pool.query(
        "INSERT INTO records(artist, title, location, year, diameter, sleeve_condition, record_condition, label) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
        [
          artist,
          title,
          location,
          year,
          diameter,
          sleeve_condition,
          record_condition,
          label,
        ],
      );
      console.log("added to db:", result.rows[0]);
      return res.status(201).send(result.rows[0].id);
    } catch (error) {
      const err = new Error(error);
      return next(err);
    } finally {
      await pool.end();
    }
  }

  const err = new Error(valRes.errors);
  err.status = 400;
  return next(err);
}
