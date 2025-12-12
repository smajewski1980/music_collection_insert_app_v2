import { validationResult } from "express-validator";
import pool from "../database/db_connect.js";

export default async function postCdCompsController(req, res, next) {
  const valRes = validationResult(req);

  if (valRes.isEmpty()) {
    // remove the below line after the normal endpoint logic is hooked up
    const result = await pool.query("select * from test_comps_check");
    return res.sendStatus(418);
  }

  const err = new Error(valRes.errors);
  err.status = 400;
  return next(err);
}
