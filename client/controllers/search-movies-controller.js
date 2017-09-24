app.controller('searchMoviesController', ['$scope', '$resource', function ($scope, $resource) {
  $scope.search = function () {
    var SearchMovies = $resource('/api/movies/search/' + $scope.searchQuery);

    SearchMovies.get(function (moviesData) {
      $scope.completedQuery = $scope.searchQuery;
      $scope.searchResults = moviesData.movies;
      $scope.page = moviesData.page;
      $scope.totalPages = moviesData.totalPages;
    });
  };
}]);
