import { validationResult } from "express-validator";

export default function postRecordsController(req, res, next) {
  const valRes = validationResult(req);

  if (valRes.isEmpty()) {
    return res.sendStatus(418);
  }

  const err = new Error(valRes.errors);
  err.status = 400;
  return next(err);
}
