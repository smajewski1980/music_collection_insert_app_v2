import request from "supertest";
import app from "../index.js";
import pool from "../database/db_connect.js";
import { jest } from "@jest/globals";

const goodCdMainData = {
  artist: "TEST artist one",
  title: "TEST title one",
  location: "Pop/Rock 99",
};

describe("/cds-main routes", () => {
  describe("check error handling for db calls", () => {
    it.todo("POST /cds-main returns 500 if there is a prob connecting to db");
  });
  describe("POST /cds-main", () => {
    describe("invalid form data", () => {
      it("returns 400 if given no artist info", async () => {
        await request(app)
          .post("/cds-main")
          .send({ ...goodCdMainData, artist: "" })
          .expect(400);
      });
      it("returns 400 if given a number instead of a string for artist", async () => {
        await request(app)
          .post("/cds-main")
          .send({ ...goodCdMainData, artist: 47 })
          .expect(400);
      });
      it("returns 400 if given no title info", async () => {
        await request(app)
          .post("/cds-main")
          .send({ ...goodCdMainData, title: "" })
          .expect(400);
      });
      it("returns 400 if given a number instead of a string for title", async () => {
        await request(app)
          .post("/cds-main")
          .send({ ...goodCdMainData, title: 47 })
          .expect(400);
      });
      it("returns 400 if given no location info", async () => {
        await request(app)
          .post("/cds-main")
          .send({ ...goodCdMainData, location: "" })
          .expect(400);
      });
    });

    it.todo("returns 201 and the cd id when given good cd data");
  });
});
