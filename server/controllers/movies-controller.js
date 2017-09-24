'use strict'
const Movie = require('../models/movie');

module.exports.popular = (req, res) => {
  return Movie.fetchPopularMovies().then((popularMovies) => {
    res.json(popularMovies);
  }).catch((e) => {
    console.error(e);
    res.status(500).send('Something broke!');
  });
};

module.exports.search = (req, res) => {
  let query = req.params && req.params.query;
  return Movie.searchMovies(query).then((movies) => {
    res.json(movies);
  }).catch((e) => {
    console.error(e);
    res.status(500).send('Something broke!');
  });
};

module.exports.find = (req, res) => {
  let movieId = req.params && req.params.movieId;
  return Movie.findMovie(movieId).then((movie) => {
    res.json(movie);
  }).catch((e) => {
    console.error(e);
    res.status(500).send('Something broke!');
  });
}
module.exports.recommendations = (req, res) => {
  let movieId = req.params && req.params.movieId;
  return Movie.getRecommendations(movieId).then((movies) => {
    res.json(movies);
  }).catch((e) => {
    console.error(e);
    res.status(500).send('Something broke!');
  });
}

