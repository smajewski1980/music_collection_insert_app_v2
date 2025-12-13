import request from "supertest";
import app from "../index.js";
import pool from "../database/db_connect.js";
import { jest } from "@jest/globals";

const goodCdCompData = {
  title: "endpoint test title 1",
  year: 1980,
  location: "Various Artists 9",
  tracks: [
    ["one hell of an artist", "one hell of a track title"],
    ["another great artist", "another great track title"],
  ],
};

describe("cd comps routes", () => {
  describe("check error handling for db calls", () => {
    let poolSpy;

    beforeEach(() => {
      poolSpy = jest.spyOn(pool, "query");
    });

    afterEach(() => {
      poolSpy.mockRestore();
    });

    it("POST /cd-comps returns 500 if there is a problem connecting to the database", async () => {
      poolSpy.mockImplementation(() => {
        throw new Error("PostgreSQL database error: Connection refused");
      });

      await request(app).post("/cd-comps").send(goodCdCompData).expect(500);
    });
  });

  describe("POST /cd-comps", () => {
    describe("invalid form data", () => {
      it("returns 400 if given no title info", async () => {
        await request(app)
          .post("/cd-comps")
          .send({ ...goodCdCompData, title: "" })
          .expect(400);
      });
      it("returns 400 if title is a number not a string", async () => {
        await request(app)
          .post("/cd-comps")
          .send({ ...goodCdCompData, title: 47 })
          .expect(400);
      });
      it("returns 400 if given no year info", async () => {
        await request(app)
          .post("/cd-comps")
          .send({ ...goodCdCompData, year: "" })
          .expect(400);
      });
      it("returns 400 if given a year too short", async () => {
        await request(app)
          .post("/cd-comps")
          .send({ ...goodCdCompData, year: 194 })
          .expect(400);
      });
      it("returns 400 if given a year too long", async () => {
        await request(app)
          .post("/cd-comps")
          .send({ ...goodCdCompData, year: 19477 })
          .expect(400);
      });
      it("returns 400 if given a year string not a number", async () => {
        await request(app)
          .post("/cd-comps")
          .send({ ...goodCdCompData, year: "1947" })
          .expect(400);
      });
      it("returns 400 if given no location info", async () => {
        await request(app)
          .post("/cd-comps")
          .send({ ...goodCdCompData, location: "" })
          .expect(400);
      });
      it("returns 400 if tracks array is empty", async () => {
        const res = await request(app)
          .post("/cd-comps")
          .send({ ...goodCdCompData, tracks: [] })
          .expect(400);
      });
      it("returns 400 if given no track artist", async () => {
        const testData = { ...goodCdCompData };
        testData.tracks[0][0] = "";
        await request(app).post("/cd-comps").send(testData).expect(400);
      });
      it("returns 400 if given no track title", async () => {
        const testData = { ...goodCdCompData };
        testData.tracks[0][0] = "one hell of an artist";
        testData.tracks[0][1] = "";
        await request(app).post("/cd-comps").send(testData).expect(400);
      });
    });

    it("returns 201 and the cd comp title id when given good comp and track data", async () => {
      goodCdCompData.tracks[0][1] = "one hell of a track title";
      const res = await request(app).post("/cd-comps").send(goodCdCompData);
      const titleId = res.body.titleId;
      expect(res.status).toBe(201);
      expect(Number.isInteger(titleId)).toBe(true);

      // cleanup
      const cleanupRes = await pool.query(
        "DELETE FROM cd_compilations WHERE title_id = $1",
        [titleId],
      );
      expect(cleanupRes.rowCount).toBe(1);
      pool.end();
    });
  });
});
