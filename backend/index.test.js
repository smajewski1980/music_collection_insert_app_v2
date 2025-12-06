import request from "supertest";
import app from "./index";

describe("test our express error handler", () => {
  it("should return a 500 server error", async () => {
    const res = await request(app).get("/errortest").expect(500);
    expect(res.body).toBe("Something went wrong on our end, please try again.");
  });
});
