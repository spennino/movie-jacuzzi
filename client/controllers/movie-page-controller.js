app.controller('moviePageController', ['$scope', '$stateParams', '$resource', function ($scope, $stateParams, $resource) {
  var movieId = $stateParams.movieId;
  $scope.movieId = movieId;
  var Movie = $resource('/api/movies/find/' + movieId);

  Movie.get(function (response) {
    $scope.movie = response;
  })
}])
