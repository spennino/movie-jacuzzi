app.component('recommendedMovies', {
  templateUrl: '/client/views/recommended-movies.html',
  controller: 'recommendedMoviesController',
  controllerAs: 'vm',
  bindings: {
    movieId: '=',
  }
});
