const request = require("supertest");
const app = require("../app");
require("../models");

let actorId;

const actor = {
  firstName: "Jhon",
  lastName: "Travolta",
  nationality: "EEUU",
  image: "yeii.png",
  birthday: "1954-02-18",
};

const URL_ACTORS = "/api/v1/actors";

test("POST -> 'URL_ACTORS', should return status code 201 and res.body.firstName === actor.firstName", async () => {
  const res = await request(app).post(URL_ACTORS).send(actor);

  actorId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(actor.firstName);
});

test("GET ALL -> 'URL_ACTORS', should return status code 200, and res.body.length === 1", async () => {
  const res = await request(app).get(URL_ACTORS);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
});

test("GET ONE -> 'URL_ACTORS/:id', should return status code 200, and res.body.firstName === actor.firstName", async () => {
  const res = await request(app).get(`${URL_ACTORS}/${actorId}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(actor.firstName);
});

test("PUT -> URL_ACTORS/:id', should return status code , and res.body.firstName === actorUpdate.firstName", async () => {
  const actorUpdate = {
    firstName: "Saoris Rood",
  };

  const res = await request(app)
    .put(`${URL_ACTORS}/${actorId}`)
    .send(actorUpdate);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(actorUpdate.firstName);
});

test("DELETE -> 'URL_ACTORS/:id', should return status code 204", async () => {
  const res = await request(app).delete(`${URL_ACTORS}/${actorId}`);

  expect(res.status).toBe(204);
});
