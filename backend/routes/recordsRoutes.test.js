import request from "supertest";
import app from "../index";
import {
  badArtistObj,
  badTitleObj,
  badLocationObj,
  badYearObj,
  badDiameterObj,
  badSleeveCondObj,
  badRecordCondObj,
  badLabelCondObj,
} from "../test_resources/recordsTestResources";

describe("records routes", () => {
  describe("check error handling for db calls", () => {
    it.todo(
      "POST /records returns 500 if there is a problem connecting to the db",
    );
  });
  describe("POST /records", () => {
    describe("invalid form data", () => {
      it("returns 400 if given invalid artist info", async () => {
        const res = await request(app).post("/records").send(badArtistObj);
        expect(res.status).toBe(400);
      });
      it.todo("returns 400 if given invalid title info");
      it.todo("returns 400 if given invalid location info");
      it.todo("returns 400 if given invalid year info");
      it.todo("returns 400 if given invalid diameter info");
      it.todo("returns 400 if given invalid sleeve condition info");
      it.todo("returns 400 if given invalid record condition info");
      it.todo("returns 400 if given invalid record label info");
    });

    it.todo("returns 201 and the posted records id");
  });

  describe("GET /records/:id", () => {
    it.todo("returns a records data given a records id");
  });
});
