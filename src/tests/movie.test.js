const request = require("supertest");
const app = require("../app");
const Genre = require("../models/Genre");
const Actor = require("../models/Actor");
const Director = require("../models/Director");
require("../models");

const URL_MOVIES = "/api/v1/movies";

let movieId;

const movie = {
  name: "Peter Pan",
  image: "es un papucho.jpg",
  synopsis:
    "Niño que vive en el nunca jamas y que se quedara joven por siempre, se enamora de Wendy una moral y junto a los niños perdidos enfrentan una feros batalla contra el capitan garfield ",
  releaseYear: "2004",
};

test("POST -> 'URL_MOVIES', should return status code 201 and res.body.name === movie.name", async () => {
  const res = await request(app).post(URL_MOVIES).send(movie);

  movieId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(movie.name);
});

test("GET ALL -> 'URL_MOVIES', should return status code 200, and res.body.length === 1", async () => {
  const res = await request(app).get(URL_MOVIES);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
});

test("GET ONE -> 'URL_MOVIES/:id', should return status code 200, and res.body.name === movie.name", async () => {
  const res = await request(app).get(`${URL_MOVIES}/${movieId}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(movie.name);
});

test("PUT -> URL_MOVIES/:id', should return status code  200, and res.body.name === movieUpdate.name", async () => {
  const movieUpdate = {
    name: "El rey leon",
  };

  const res = await request(app)
    .put(`${URL_MOVIES}/${movieId}`)
    .send(movieUpdate);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(movieUpdate.name);
});

// URL_MOVIES/:id/genres
test("POST -> 'URL_MOVIES/:id/genres' should return status code 200, and res.body.length === 1", async () => {
  const genre = {
    name: "Familiar",
  };

  const createGenre = await Genre.create(genre);

  const res = await request(app)
    .post(`${URL_MOVIES}/${movieId}/genres`)
    .send([createGenre.id]);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
  expect(res.body[0].id).toBe(createGenre.id);

  await createGenre.destroy();
});

// URL_MOVIES/:id/actors
test("POST -> 'URL_MOVIES/:id/actors', should return status code 200, and res.body.length === 1", async () => {
  const actor = {
    firstName: "Jeremy ",
    lastName: "Sumpter",
    nationality: "EEUU",
    image: "peter-pan.png",
    birthday: "1989-02-05",
  };

  const createActor = await Actor.create(actor);

  const res = await request(app)
    .post(`${URL_MOVIES}/${movieId}/actors`)
    .send([createActor.id]);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
  expect(res.body[0].id).toBe(createActor.id);

  await createActor.destroy();
});

// URL_MOVIES/:id/directors
test("POST -> 'URL_MOVIES/:id/directors', should return status code 200, and res.body.length === 1", async () => {
  const director = {
    firstName: "Jhon",
    lastName: "Avildsen",
    nationality: "EEUU",
    image: "bettsDirector.jpg",
    birthday: "1935-12-21",
  };

  const createDirector = await Director.create(director);

  const res = await request(app)
    .post(`${URL_MOVIES}/${movieId}/directors`)
    .send([createDirector.id]);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
  expect(res.body[0].id).toBe(createDirector.id);

  await createDirector.destroy();
});

test("DELETE -> URL_MOVIES/:id', should return status code 204", async () => {
  const res = await request(app).delete(`${URL_MOVIES}/${movieId}`);

  expect(res.status).toBe(204);
});
