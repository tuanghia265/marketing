import req from "supertest";
import app from "../server";
import { json } from "body-parser";

const SECOND = 1000;
jest.setTimeout(70 * SECOND);

describe("POST: /api/create-new-store", () => {
  describe("Enter a new store name", () => {
    test("should return status 200", async () => {
      const res = await req(app).post("/api/create-new-store").send({
        name: "dalilat",
        userID: 33,
        image: "https://",
        url: "url",
      });
      expect(res.statusCode).toBe(200);
    });
  });
});

describe("GET: /api/get-all-store", () => {
  describe("when id is undefine", () => {
    test("should return status 500", async () => {
      const res = await req(app).get("/api/get-all-store").send({
        id: "",
      });
      expect(res.statusCode).toBe(500);
    });
  });
});
