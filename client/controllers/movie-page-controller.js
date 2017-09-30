app.controller('moviePageController', ['$scope', '$stateParams', '$resource', '$window', function ($scope, $stateParams, $resource, $window) {
  $window.scrollTo(0,0);
  var movieId = $stateParams.movieId;
  $scope.movieId = movieId;
  var Movie = $resource('/api/movies/find/' + movieId);

  Movie.get(function (response) {
    $scope.movie = response;
  })
}])
