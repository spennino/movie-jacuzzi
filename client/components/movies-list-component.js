app.component('moviesList', {
  templateUrl: '/client/views/movies-list.html',
  controllerAs: 'vm',
  bindings: {
    movies: '=',
    page: '=',
    totalPages: '='
  }
});
