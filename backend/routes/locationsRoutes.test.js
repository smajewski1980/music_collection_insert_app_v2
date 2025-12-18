import request from "supertest";
import app from "../index.js";
import pool from "../database/db_connect.js";
import { afterAll, afterEach, beforeEach, jest } from "@jest/globals";

describe("GET locations routes", () => {
  afterAll(() => {
    pool.end();
  });
  describe("check error handling for db calls", () => {
    let poolSpy;

    beforeEach(() => {
      poolSpy = jest.spyOn(pool, "query");
    });

    afterEach(() => {
      poolSpy.mockRestore();
    });

    it("POST /cds-main returns 500 if there is a prob connecting to db", async () => {
      poolSpy.mockImplementation(() => {
        throw new Error("PostgreSQL database error: Connection refused");
      });

      const res = await request(app).get("/locations").expect(500);
    });
  });

  it("returns 200 and an object containing the active locations", async () => {
    const res = await request(app).get("/locations").expect(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        records: expect.any(Array),
        tapes: expect.any(Array),
        cds: expect.any(Array),
        cdSingles: expect.any(Array),
        cdComps: expect.any(Array),
      }),
    );
  });
});
