import request from "supertest";
import app from "..";
import pool from "../database/db_connect.js";
import { describe, jest } from "@jest/globals";

const goodCdCompData = {
  title: "endpoint test title 1",
  year: 1980,
  location: "Various Artists 9",
  tracks: [
    {
      artist: "one hell of an artist",
      track_name: "one hell of a track title",
    },
    {
      artist: "another great artist",
      track_name: "another great track title",
    },
  ],
};

describe("cd comps routes", () => {
  describe("check error handling for db calls", () => {
    it.todo(
      "POST /cd-comps returns 500 if there is a problem connecting to the database",
    );
  });

  describe("POST /cd-comps", () => {
    describe("invalid form data", () => {
      it.todo("returns 400 if given no title info");
      it.todo("returns 400 if artist is a number not a string");
      it.todo("returns 400 if given no year info");
      it.todo("returns 400 if given a year too short");
      it.todo("returns 400 if given a year too long");
      it.todo("returns 400 if given a year string not a number");
      it.todo("returns 400 if given no location info");
      it.todo("returns 400 if tracks array is empty");
      it.todo("returns 400 if given no track artist");
      it.todo("returns 400 if given a number not string for track artist");
      it.todo("returns 400 if given no track title");
      it.todo("returns 400 if given a number not string for track title");
      it.todo("returns 400 if given no title id");
      it.todo("returns 400 if given a string not number for title id");
    });

    it.todo("returns 201 and the cd comp title id when given good comp data");
    it.todo("returns 201 when given good track data");
  });
});
