const request = require("supertest");
const app = require("../app");
require("../models");

let directorId;

const director = {
  firstName: "Daniel",
  lastName: "Goledman",
  nationality: "Canada",
  image: "yeiis.png",
  birthday: "1980-09-12",
};

const URL_DIRECTORS = "/api/v1/directors";

test("POST -> 'URL_DIRECTORS', should return status code 201 and res.body.firstName === director.firstName", async () => {
  const res = await request(app).post(URL_DIRECTORS).send(director);

  directorId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(director.firstName);
});

test("GET ALL -> 'URL_DIRECTORS', should return status code 200, and res.body.length === 1", async () => {
  const res = await request(app).get(URL_DIRECTORS);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
});

test("GET ONE -> 'URL_DIRECTORS/:id', should return status code 200, and res.body.firstName === director.firstName", async () => {
  const res = await request(app).get(`${URL_DIRECTORS}/${directorId}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(director.firstName);
});

test("PUT -> URL_DIRECTORS/:id', should return status code 200 , and res.body.firstName === directorUpdate.firstName", async () => {
  const directorUpdate = {
    firstName: "Tim Burtom",
  };

  const res = await request(app)
    .put(`${URL_DIRECTORS}/${directorId}`)
    .send(directorUpdate);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(directorUpdate.firstName);
});

test("DELETE -> 'URL_DIRECTORS/:id', should return status code 204", async () => {
  const res = await request(app).delete(`${URL_DIRECTORS}/${directorId}`);

  expect(res.status).toBe(204);
});
