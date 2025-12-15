import request from "supertest";
import app from "../index.js";
import pool from "../database/db_connect.js";
import { afterAll, jest } from "@jest/globals";

const goodCdSingleData = {
  artist: "One Single Artist",
  title: "One Single Title",
  year: 1980,
  caseType: "Slimline",
  tracks: [
    "Track Title One",
    "Track Title One(Radio Version)",
    "Track Title One(DJ Blah Blah Remix)",
    "Track Title Two",
  ],
};

describe("cd singles routes", () => {
  describe("check error handling for db calls", () => {
    it.todo(
      "POST /cd-singles returns 500 if there is a problem connecting to the db",
    );
  });

  describe("POST /cd-singles", () => {
    describe("invalid form data", () => {
      it("returns 400 if given no artist info", async () => {
        await request(app)
          .post("/cd-singles")
          .send({ ...goodCdSingleData, artist: "" })
          .expect(400);
      });
      it("returns 400 if artist is a number not a string", async () => {
        await request(app)
          .post("/cd-singles")
          .send({ ...goodCdSingleData, artist: 47 })
          .expect(400);
      });
      it("returns 400 if given no title info", async () => {
        await request(app)
          .post("/cd-singles")
          .send({ ...goodCdSingleData, title: "" })
          .expect(400);
      });
      it("returns 400 if title is a number not a string", async () => {
        await request(app)
          .post("/cd-singles")
          .send({ ...goodCdSingleData, title: 47 })
          .expect(400);
      });
      it("returns 400 if given no year info", async () => {
        await request(app)
          .post("/cd-singles")
          .send({ ...goodCdSingleData, year: undefined })
          .expect(400);
      });
      it("returns 400 if given a year too short", async () => {
        await request(app)
          .post("/cd-singles")
          .send({ ...goodCdSingleData, year: 198 })
          .expect(400);
      });
      it("returns 400 if given a year too long", async () => {
        await request(app)
          .post("/cd-singles")
          .send({ ...goodCdSingleData, year: 19800 })
          .expect(400);
      });
      it("returns 400 if given a year as a string not a number", async () => {
        await request(app)
          .post("/cd-singles")
          .send({ ...goodCdSingleData, year: "1980" })
          .expect(400);
      });
      it("returns 400 if given no case type", async () => {
        await request(app)
          .post("/cd-singles")
          .send({ ...goodCdSingleData, caseType: "" })
          .expect(400);
      });
      it("returns 400 if given no tracks", async () => {
        await request(app)
          .post("/cd-singles")
          .send({ ...goodCdSingleData, tracks: [] })
          .expect(400);
      });
      it("returns 400 if given empty string for track name", async () => {
        const testData = { ...goodCdSingleData };
        testData.tracks[0] = "";
        await request(app).post("/cd-singles").send(testData).expect(400);
      });

      afterAll(() => {
        goodCdSingleData.tracks[0] = "Track Title One";
      });
    });

    it("returns 201 and the single id when given good single and track data", async () => {
      const res = await request(app).post("/cd-singles").send(goodCdSingleData);

      const singleId = res.body.single_id;
      expect(res.status).toBe(201);
      expect(Number.isInteger(singleId));
      // cleanup
    });
  });
});
