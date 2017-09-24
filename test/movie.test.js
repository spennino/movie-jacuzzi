'use strict'
const dotenv = require('dotenv').config();
const expect = require('chai').expect;
const nock = require('nock');
const Movie = require('../server/models/movie');
const mockResponses = require('./mock-responses');
const tmdbAPIKey = process.env.TMDB_API_KEY;
const tmdbBaseUrl = 'https://api.themoviedb.org/3';

describe('test movie model', () => {
  describe('test fetchPopularMovies', () => {
    beforeEach(() => {
      nock(tmdbBaseUrl)
        .get('/movie/popular?api_key=' + tmdbAPIKey)
        .reply(200, mockResponses.popularMovies);
    });

    it('generates movies data from popular movies', () => {
      return Movie.fetchPopularMovies().then(response => {
          expect(typeof response).to.equal('object');
          expect(response.page).to.equal(1);
          expect(response.totalPages).to.equal(983);
          expect(response.movies.length).to.equal(20);
        });
    });
  });

  describe('test searchMovies', () => {
    beforeEach(() => {
      nock(tmdbBaseUrl)
        .get('/search/movie?query=cat&api_key=' + tmdbAPIKey)
        .reply(200, mockResponses.searchMovies);
    });

    it('generates movies data base on search', () => {
      let query = 'cat';
      return Movie.searchMovies(query).then(response => {
          expect(typeof response).to.equal('object');
          expect(response.page).to.equal(1);
          expect(response.totalPages).to.equal(67);
          expect(response.movies.length).to.equal(20);
        });
    });
  });

  describe('test findMovie', () => {
    beforeEach(() => {
      nock(tmdbBaseUrl)
        .get('/movie/321612?api_key=' + tmdbAPIKey)
        .reply(200, mockResponses.findMovie);
    });

    it('generates movie data base on id', () => {
      let id = 321612;
      return Movie.findMovie(id).then(response => {
          expect(typeof response).to.equal('object');
          expect(response.id).to.equal(id);
          expect(response.title).to.equal('Beauty and the Beast');
          expect(response.voteAverage).to.equal(6.8);
        });
    });
  });

  describe('test getRecommendations', () => {
    beforeEach(() => {
      nock(tmdbBaseUrl)
        .get('/movie/321612/recommendations?api_key=' + tmdbAPIKey)
        .reply(200, mockResponses.recommendedMovies);
    });

    it('generates movies data base on id', () => {
      let id = 321612;
      return Movie.getRecommendations(id).then(response => {
          expect(typeof response).to.equal('object');
          expect(response.page).to.equal(1);
          expect(response.movies.length).to.equal(20);
        });
    });
  });
})

