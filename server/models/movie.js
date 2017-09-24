'use strict'
const request = require('request');
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const tmdbBaseImgUrl = 'http://image.tmdb.org/t/p/';
const tmdbAPIKey = process.env.TMDB_API_KEY;

function getRequestPromise (uri) {
  return new Promise((resolve, reject) => {
    request(uri, (error, res, body) => {
      if (error)
        reject(error);
      else
        resolve(JSON.parse(body));
    });
  });
}

function generateMoviesDataFromResponse (response) {
  let moviesData = {
    page: response.page,
    totalPages: response.total_pages,
    movies: [],
  };
  if (response.results && response.results.length)
    response.results.forEach((result) => {
      moviesData.movies.push(generateMovieDataFromResponse(result));
    });
  return moviesData;
}

function generateMovieDataFromResponse (response) {
  if (!response) return;
  let movieData = {
    id: response.id,
    title: response.title,
    posterUrl: tmdbBaseImgUrl + 'w342/' + response.poster_path,
    backdropUrl: tmdbBaseImgUrl + 'original/' + response.backdrop_path,
    overview: response.overview,
    voteAverage: response.vote_average,
    releaseDate: new Date(response.release_date),
  };
  return movieData;
}

module.exports.fetchPopularMovies = () => {
  let uri = tmdbBaseUrl + '/movie/popular?api_key=' + tmdbAPIKey;
  return getRequestPromise(uri).then((popularMoviesResponse) => {
    let moviesData = generateMoviesDataFromResponse(popularMoviesResponse);
    return moviesData;
  });
};

module.exports.searchMovies = (query) => {
  let uri = tmdbBaseUrl + '/search/movie?query=' + query + '&api_key=' + tmdbAPIKey;
  return getRequestPromise(uri).then((searchMoviesResponse) => {
    return generateMoviesDataFromResponse(searchMoviesResponse);
  });
}

module.exports.findMovie = (movieId) => {
  let uri = tmdbBaseUrl + '/movie/' + movieId + '?api_key=' + tmdbAPIKey;
  return getRequestPromise(uri).then((findMovieResponse) => {
    return generateMovieDataFromResponse(findMovieResponse);
  });
}

module.exports.getRecommendations = (movieId) => {
  let uri = tmdbBaseUrl + '/movie/' + movieId + '/recommendations?api_key=' + tmdbAPIKey;
  return getRequestPromise(uri).then((recommendationsResponse) => {
    return generateMoviesDataFromResponse(recommendationsResponse);
  });
}

