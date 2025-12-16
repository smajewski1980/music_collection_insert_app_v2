import { validationResult } from "express-validator";
import pool from "../database/db_connect.js";

export default function postTapesController(req, res, next) {
  const valRes = validationResult(req);
  if (valRes.isEmpty()) {
    return res.sendStatus(418);
  }

  const err = new Error(valRes.errors);
  err.status = 400;
  return next(err);
}
