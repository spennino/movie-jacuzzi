app.controller('searchMoviesController', ['$scope', '$resource', function ($scope, $resource) {
  $scope.search = function () {
    if ($scope.searchQuery) {
      $scope.isSearching = true;
      $scope.searchResults = undefined;
      $scope.submittedQuery = $scope.searchQuery;

      var SearchMovies = $resource('/api/movies/search/' + $scope.searchQuery);

      SearchMovies.get(function (moviesData) {
        $scope.isSearching = false;
        $scope.searchResults = moviesData.movies;
        $scope.page = moviesData.page;
        $scope.totalPages = moviesData.totalPages;
      });
    }
  };
}]);
