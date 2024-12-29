import req from "supertest";
import app from "../server";
import { json } from "body-parser";

const SECOND = 1000;
jest.setTimeout(70 * SECOND);

describe("POST: /api/login", () => {
  describe("Login is Successfully", () => {
    test("should return status 200", async () => {
      const res = await req(app).post("/api/login").send({
        email: "lord@gmail.com",
        password: "lord",
      });
      expect(res.statusCode).toBe(200);
    });
  });
});

describe("GET:/api/get-all-user", () => {
  describe("when id is undefined", () => {
    test("should return status 500", async () => {
      const res = await req(app).get("/api/get-all-user").send({
        id: "",
      });
      expect(res.statusCode).toBe(500);
    });
  });
});

describe("CREATE: /api/create-new-user", () => {
  describe("When enter new email", () => {
    test("should return status 200", async () => {
      const res = await req(app).post("/api/create-new-user").send({
        username: "cum",
        email: "lord@gmail.cum",
        password: "cum",
        roleID: 2,
      });
      expect(res.statusCode).toBe(200);
    });
  });
});
