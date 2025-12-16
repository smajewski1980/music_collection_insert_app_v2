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
      it.todo("returns 400 if given no artist info");
      it.todo("returns 400 if given a number instead of a string for artist");
      it.todo("returns 400 if given no title info");
      it.todo("returns 400 if given a number instead of a string for title");
      it.todo("returns 400 if given no location info");
    });

    it.todo("returns 201 and the cd id when given good cd data");
  });
});
