'use strict'
const dotenv = require('dotenv').config();
const PORT = process.env.MJ_PORT || 3000;
const express = require('express');
const app = express();
const moviesController = require('./server/controllers/movies-controller');

app.use('/', express.static(__dirname + '/'));
app.get('/', (req, res) => res.sendFile(__dirname + '/client/views/index.html'));
app.get('/api/movies/popular', moviesController.popular);
app.get('/api/movies/search/:query', moviesController.search);
app.get('/api/movies/find/:movieId', moviesController.find);
app.get('/api/movies/recommended/:movieId', moviesController.recommendations);

app.listen(PORT, () => console.log(`Listing on port ${PORT}...`));

