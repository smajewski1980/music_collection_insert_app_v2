import { validationResult } from "express-validator";
import pool from "../database/db_connect.js";

export default async function postCdCompsController(req, res, next) {
  const valRes = validationResult(req);
  const { title, year, location, tracks } = req.body;

  if (valRes.isEmpty()) {
    try {
      // BEGIN transaction
      await pool.query("BEGIN");

      // send title info and get id
      const titleRes = await pool.query(
        "INSERT INTO cd_compilations(title, year, location) VALUES($1, $2, $3) RETURNING title_id",
        [title, year, location],
      );
      const titleId = titleRes.rows[0].title_id;

      // loop through the tracks and create the parmeters array for the insert
      const tracksInsertVals = [];
      tracks.forEach((tr) => {
        const artist = tr.split(",")[0];
        const trackName = tr.split(",")[1];
        tracksInsertVals.push(artist, trackName, titleId);
      });

      // construct the variables string for the tracks insert
      let paramVarsStr = "";
      for (let i = 1; i < tracksInsertVals.length; i += 3) {
        paramVarsStr += `($${i},$${i + 1},$${i + 2})`;
        if (i < tracksInsertVals.length - 3) {
          paramVarsStr += ",";
        }
      }

      // insert the tracks and commit transaction
      try {
        await pool.query(
          `INSERT INTO cd_compilations_tracks(artist, track_name, title_id) VALUES ${paramVarsStr}`,
          [...tracksInsertVals],
        );

        // COMMIT tranaction
        await pool.query("COMMIT");

        console.log(`${title} has been committed to the DB.`);
        return res.status(201).send({ titleId });
      } catch (error) {
        await pool.query("ROLLBACK");
        return next(new Error(error));
      }
    } catch (error) {
      await pool.query("ROLLBACK");
      return next(new Error(error));
    }
  }

  const err = new Error(valRes.errors);
  err.status = 400;
  return next(err);
}
