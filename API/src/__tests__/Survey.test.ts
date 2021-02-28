import request from "supertest";
import { getConnection } from "typeorm";
import { app } from "../app";
import createConnection from "../database";

describe("Survey", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to create a new survey", async () => {
    const response = await request(app).post("/survey").send({
      title: "Tille Example",
      description: "description example",
    });
    expect(response.status).toBe(201);
  });

  it("Should't be able to create a new survey", async () => {
    const response = await request(app).post("/survey").send({
      title: "Tille Example",
      description: "description example",
    });
    expect(response.status).toBe(400);
  });

  // it("Should be able to get all surveys", async () => {
  //   const response = await request(app).get("/survey");
  //   expect(response.status).toBe(200);
  // });
});
