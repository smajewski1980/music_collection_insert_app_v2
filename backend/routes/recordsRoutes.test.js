import request from "supertest";
import app from "..";
import pool from "../database/db_connect.js";
import { jest } from "@jest/globals";

const goodRecordObj = {
  artist: "test artist",
  title: "test title",
  location: "33s Test Location",
  year: 1980,
  diameter: "12 inch",
  sleeve_condition: "***",
  record_condition: "***",
  label: "Some Record Label",
};

describe("records routes", () => {
  describe("check error handling for db calls", () => {
    let poolSpy;

    beforeEach(() => {
      poolSpy = jest.spyOn(pool, "query");
    });

    afterEach(() => {
      poolSpy.mockRestore();
    });

    it("POST /records returns 500 if there is a problem connecting to the db", async () => {
      poolSpy.mockImplementation(() => {
        throw new Error("PostgreSQL database error: Connection refused");
      });

      await request(app).post("/records").send(goodRecordObj).expect(500);
    });
  });
  describe("POST /records", () => {
    describe("invalid form data", () => {
      it("returns 400 if given no artist info", async () => {
        const testData = { ...goodRecordObj, artist: "" };
        const res = await request(app).post("/records").send(testData);
        expect(res.status).toBe(400);
      });
      it("returns 400 if artist is a number not a string", async () => {
        const testData = { ...goodRecordObj, artist: 47 };
        const res = await request(app).post("/records").send(testData);
        expect(res.status).toBe(400);
      });
      it("returns 400 if given no title info", async () => {
        const testData = { ...goodRecordObj, title: "" };
        const res = await request(app).post("/records").send(testData);
        expect(res.status).toBe(400);
      });
      it("returns 400 if title is a number not a string", async () => {
        const testData = { ...goodRecordObj, title: 47 };
        const res = await request(app).post("/records").send(testData);
        expect(res.status).toBe(400);
      });
      it("returns 400 if given no location info", async () => {
        const testData = { ...goodRecordObj, location: "" };
        const res = await request(app).post("/records").send(testData);
        expect(res.status).toBe(400);
      });
      it("returns 400 if location is a number not a string", async () => {
        const testData = { ...goodRecordObj, location: 47 };
        const res = await request(app).post("/records").send(testData);
        expect(res.status).toBe(400);
      });
      it("returns 400 if given no year info", async () => {
        const testData = { ...goodRecordObj, year: "" };
        const res = await request(app).post("/records").send(testData);
        expect(res.status).toBe(400);
      });
      it("returns 400 if given a year too short", async () => {
        const testData = { ...goodRecordObj, year: 194 };
        const res = await request(app).post("/records").send(testData);
        expect(res.status).toBe(400);
      });
      it("returns 400 if given a year too long", async () => {
        const testData = { ...goodRecordObj, year: 19477 };
        const res = await request(app).post("/records").send(testData);
        expect(res.status).toBe(400);
      });
      it("returns 400 if given a string year not a number", async () => {
        const testData = { ...goodRecordObj, year: "1947" };
        const res = await request(app).post("/records").send(testData);
        expect(res.status).toBe(400);
      });
      it("returns 400 if given no diameter info", async () => {
        const testData = { ...goodRecordObj, diameter: "" };
        const res = await request(app).post("/records").send(testData);
        expect(res.status).toBe(400);
      });
      it("returns 400 if diameter is number not string", async () => {
        const testData = { ...goodRecordObj, diameter: 47 };
        const res = await request(app).post("/records").send(testData);
        expect(res.status).toBe(400);
      });
      it("returns 400 if given no sleeve condition info", async () => {
        const testData = { ...goodRecordObj, sleeve_condition: "" };
        const res = await request(app).post("/records").send(testData);
        expect(res.status).toBe(400);
      });
      it("returns 400 if sleeve condition is longer than 5 *'s", async () => {
        const testData = { ...goodRecordObj, sleeve_condition: "******" };
        const res = await request(app).post("/records").send(testData);
        expect(res.status).toBe(400);
      });
      it("returns 400 if sleeve condition contains characters other than *'s", async () => {
        const testData = { ...goodRecordObj, sleeve_condition: "xxx" };
        const res = await request(app).post("/records").send(testData);
        expect(res.status).toBe(400);
      });
      it("returns 400 if given no record condition info", async () => {
        const testData = { ...goodRecordObj, record_condition: "" };
        const res = await request(app).post("/records").send(testData);
        expect(res.status).toBe(400);
      });
      it("returns 400 if record condition is longer than 5 *'s", async () => {
        const testData = { ...goodRecordObj, record_condition: "******" };
        const res = await request(app).post("/records").send(testData);
        expect(res.status).toBe(400);
      });
      it("returns 400 if record condition contains characters other than *'s", async () => {
        const testData = { ...goodRecordObj, record_condition: "xxx" };
        const res = await request(app).post("/records").send(testData);
        expect(res.status).toBe(400);
      });
      it("returns 400 if given no label info", async () => {
        const testData = { ...goodRecordObj, label: "" };
        const res = await request(app).post("/records").send(testData);
        expect(res.status).toBe(400);
      });
      it("returns 400 if label is a number not a string", async () => {
        const testData = { ...goodRecordObj, label: 47 };
        const res = await request(app).post("/records").send(testData);
        expect(res.status).toBe(400);
      });
    });

    it("returns 201 and the posted records id", async () => {
      const res = await request(app).post("/records").send(goodRecordObj);
      expect(res.status).toBe(201);
      expect(Number.isInteger(res.body)).toBe(true);
      // cleanup - delete the newly created record
      const newId = res.body;
      const cleanupRes = await pool.query("DELETE FROM records where id = $1", [
        newId,
      ]);
      expect(cleanupRes.rowCount).toBe(1);
    });

    afterAll(() => {
      pool.end();
    });
  });
});
