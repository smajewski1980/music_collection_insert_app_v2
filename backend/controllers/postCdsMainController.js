import { validationResult } from "express-validator";
import pool from "../database/db_connect.js";

export default async function (req, res, next) {
  const valRes = validationResult(req);
  const { artist, title, location } = req.body;

  if (valRes.isEmpty()) {
    try {
      const result = await pool.query(
        "INSERT INTO cds(artist, title, location) VALUES($1, $2, $3) RETURNING id",
        [artist, title, location],
      );
      console.log(`Cd ${title} by ${artist} has been added to the db.`);
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
