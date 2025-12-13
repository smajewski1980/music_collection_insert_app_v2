import request from "supertest";
import app from "../index.js";
import pool from "../database/db_connect.js";
import { jest } from "@jest/globals";

const goodCdSingleData = {
  artist: "One Single Artist",
  title: "One Single Title",
  year: 1980,
  case_type: "Slimline",
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
      it.todo("returns 400 if given no title info");
      it.todo("returns 400 if title is a number not a string");
      it.todo("returns 400 if given no year info");
      it.todo("returns 400 if given a year too short");
      it.todo("returns 400 if given a year too long");
      it.todo("returns 400 if given a year as a string not a number");
      it.todo("returns 400 if given no case type");
      it.todo("returns 400 if given no tracks");
      it.todo("returns 400 if given empty string for track name");
      it.todo(
        "returns 400 if given a number instead of a string for a track name",
      );
    });

    it.todo(
      "returns 201 and the single id when given good single and track data",
    );
  });
});
