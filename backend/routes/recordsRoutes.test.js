import request from "supertest";
import app from "../index";
import {
  noArtistObj,
  numArtistObj,
  noTitleObj,
  numTitleObj,
  noLocationObj,
  numLocationObj,
  noYearObj,
  longYearObj,
  shortYearObj,
  strYearObj,
  noDiameterObj,
  numDiameterObj,
  noSleeveCondObj,
  longSleeveCondObj,
  nonStarSleeveCondObj,
  noRecordCondObj,
  longRecordCondObj,
  nonStarsRecordCondObj,
  noLabelObj,
  numLabelObj,
  goodRecordObj,
} from "../test_resources/recordsTestResources";

describe("records routes", () => {
  describe("check error handling for db calls", () => {
    it.todo(
      "POST /records returns 500 if there is a problem connecting to the db",
    );
  });
  describe("POST /records", () => {
    describe("invalid form data", () => {
      it("returns 400 if given no artist info", async () => {
        const res = await request(app).post("/records").send(noArtistObj);
        expect(res.status).toBe(400);
      });
      it("returns 400 if artist is a number not a string", async () => {
        const res = await request(app).post("/records").send(numArtistObj);
        expect(res.status).toBe(400);
      });
      it("returns 400 if given no title info", async () => {
        const res = await request(app).post("/records").send(noTitleObj);
        expect(res.status).toBe(400);
      });
      it("returns 400 if title is a number not a string", async () => {
        const res = await request(app).post("/records").send(numTitleObj);
        expect(res.status).toBe(400);
      });
      it("returns 400 if given no location info", async () => {
        const res = await request(app).post("/records").send(noLocationObj);
        expect(res.status).toBe(400);
      });
      it("returns 400 if location is a number not a string", async () => {
        const res = await request(app).post("/records").send(numLocationObj);
        expect(res.status).toBe(400);
      });
      it("returns 400 if given no year info", async () => {
        const res = await request(app).post("/records").send(noYearObj);
        expect(res.status).toBe(400);
      });
      it("returns 400 if given a year too short", async () => {
        const res = await request(app).post("/records").send(shortYearObj);
        expect(res.status).toBe(400);
      });
      it("returns 400 if given a year too long", async () => {
        const res = await request(app).post("/records").send(longYearObj);
        expect(res.status).toBe(400);
      });
      it("returns 400 if given a string year not a number", async () => {
        const res = await request(app).post("/records").send(strYearObj);
        expect(res.status).toBe(400);
      });
      it("returns 400 if given no diameter info", async () => {
        const res = await request(app).post("/records").send(noDiameterObj);
        expect(res.status).toBe(400);
      });
      it("returns 400 if diameter is number not string", async () => {
        const res = await request(app).post("/records").send(numDiameterObj);
        expect(res.status).toBe(400);
      });
      it("returns 400 if given no sleeve condition info", async () => {
        const res = await request(app).post("/records").send(noSleeveCondObj);
        expect(res.status).toBe(400);
      });
      it("returns 400 if sleeve condition is longer than 5 *'s", async () => {
        const res = await request(app).post("/records").send(longSleeveCondObj);
        expect(res.status).toBe(400);
      });
      it("returns 400 if sleeve condition contains characters other than *'s", async () => {
        const res = await request(app)
          .post("/records")
          .send(nonStarSleeveCondObj);
        expect(res.status).toBe(400);
      });
      it("returns 400 if given no record condition info", async () => {
        const res = await request(app).post("/records").send(noRecordCondObj);
        expect(res.status).toBe(400);
      });
      it("returns 400 if record condition is longer than 5 *'s", async () => {
        const res = await request(app).post("/records").send(longRecordCondObj);
        expect(res.status).toBe(400);
      });
      it("returns 400 if record condition contains characters other than *'s", async () => {
        const res = await request(app)
          .post("/records")
          .send(nonStarsRecordCondObj);
        expect(res.status).toBe(400);
      });
      it("returns 400 if given no label info", async () => {
        const res = await request(app).post("/records").send(noLabelObj);
        expect(res.status).toBe(400);
      });
      it("returns 400 if label is a number not a string", async () => {
        const res = await request(app).post("/records").send(numLabelObj);
        expect(res.status).toBe(400);
      });
    });

    it("returns 201 and the posted records id", async () => {
      const res = await request(app).post("/records").send(goodRecordObj);
      expect(res.status).toBe(201);
      expect(Number.isInteger(res.body)).toBe(true);
    });
  });

  describe("GET /records/:id", () => {
    it.todo("returns a records data given a records id");
  });
});
