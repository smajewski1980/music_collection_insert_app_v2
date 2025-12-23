import pool from "../database/db_connect.js";

export default async function (req, res, next) {
  try {
    // dammit, need to rename the view in db
    // for production the view is current_tapes_location <-- no 's'
    const tapesResult = await pool.query(
      "SELECT * FROM current_tapes_location",
    );
    const recordsResult = await pool.query(
      "SELECT * FROM current_records_locations",
    );
    const cdsResult = await pool.query("SELECT * FROM current_cds_locations");
    const cdSinglesResult = await pool.query(
      "SELECT * FROM current_cd_singles_locations",
    );
    const cdCompsResult = await pool.query(
      "SELECT * FROM current_cd_comps_locations",
    );

    const locationData = {
      tapes: tapesResult.rows,
      records: recordsResult.rows,
      cds: cdsResult.rows,
      cdComps: cdCompsResult.rows,
      cdSingles: cdSinglesResult.rows,
    };
    return res.status(200).json(locationData);
  } catch (error) {
    next(new Error(error));
  }
}
