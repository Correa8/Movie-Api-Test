const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");

//Pelicula de muchos Actores
Movie.belongsToMany(Actor, { through: "MoviesActores" });
Actor.belongsToMany(Movie, { through: "MoviesActores" });

Movie.belongsToMany(Director, { through: "MoviesDirectores" });
Director.belongsToMany(Movie, { through: "MoviesDirectores" });

Movie.belongsToMany(Genre, { through: "MoviesGenres" });
Genre.belongsToMany(Movie, { through: "MoviesGenres" });
