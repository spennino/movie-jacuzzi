app.controller('popularMoviesController', ['$scope', '$resource', function ($scope, $resource) {
  var PopularMovies = $resource('/api/movies/popular');

  PopularMovies.get(function (popularMoviesData) {
    $scope.popularMovies = popularMoviesData.movies;
    $scope.page = popularMoviesData.page;
    $scope.totalPages = popularMoviesData.totalPages;
  });
}]);
