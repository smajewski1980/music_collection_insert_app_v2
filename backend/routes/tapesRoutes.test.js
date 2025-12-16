import request from "supertest";
import app from "../index.js";
import pool from "../database/db_connect.js";
import { describe, jest } from "@jest/globals";

const goodTapeData = {
  artist: "Tape Test Artist One",
  title: "Tape Test Title One",
  location: "8-Tracks Box 47",
  year: 1985,
  needsRepair: "No",
  speed: "na",
};

describe("tapes routes", () => {
  describe("check error handling for db calls", () => {
    it.todo("POST /tapes returns 500 if there is a prob connecting to db");
  });
  describe("POST /tapes", () => {
    describe("invalid form data", () => {
      it("returns 400 if given no artist info", async () => {
        await request(app)
          .post("/tapes")
          .send({ ...goodTapeData, artist: "" })
          .expect(400);
      });
      it("returns 400 if given a number instead of a string for artist", async () => {
        await request(app)
          .post("/tapes")
          .send({ ...goodTapeData, artist: 47 })
          .expect(400);
      });
      it("returns 400 if given no title info", async () => {
        await request(app)
          .post("/tapes")
          .send({ ...goodTapeData, title: "" })
          .expect(400);
      });
      it("returns 400 if given a number instead of a string for title", async () => {
        await request(app)
          .post("/tapes")
          .send({ ...goodTapeData, title: 47 })
          .expect(400);
      });
      it("returns 400 if given no location info", async () => {
        await request(app)
          .post("/tapes")
          .send({ ...goodTapeData, location: "" })
          .expect(400);
      });
      it("returns 400 if given no year info", async () => {
        await request(app)
          .post("/tapes")
          .send({ ...goodTapeData, year: undefined })
          .expect(400);
      });
      it("returns 400 if given a year too short", async () => {
        await request(app)
          .post("/tapes")
          .send({ ...goodTapeData, year: 198 })
          .expect(400);
      });
      it("returns 400 if given a year too long", async () => {
        await request(app)
          .post("/tapes")
          .send({ ...goodTapeData, year: 19800 })
          .expect(400);
      });
      it("returns 400 if given a string instead of number for year", async () => {
        await request(app)
          .post("/tapes")
          .send({ ...goodTapeData, year: "1980" })
          .expect(400);
      });
      it("returns 400 if given a string other than Yes or No for needs_repair", async () => {
        await request(app)
          .post("/tapes")
          .send({ ...goodTapeData, needsRepair: "Unicorns Rock!" })
          .expect(400);
      });
      it("returns 400 if given a number instead of a string for needs repair", async () => {
        await request(app)
          .post("/tapes")
          .send({ ...goodTapeData, needRepair: 47 })
          .expect(400);
      });
      it.todo(
        "returns 400 if given a string other than 3 3/4, 7 1/4, na for speed",
      );
    });
    it.todo("returns 201 and the tape id when given good tape data");
  });
});
