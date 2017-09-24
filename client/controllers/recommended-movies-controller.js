app.controller('recommendedMoviesController', ['$scope', '$resource', function ($scope, $resource) {
  var vm = $scope.vm;
  vm.$onInit = function () {
    getRecommendedMovies();
  };

  function getRecommendedMovies () {
    var RecommendedMovies = $resource('/api/movies/recommended/' + vm.movieId);

    RecommendedMovies.get(function (recommendedMoviesData) {
      $scope.recommendedMovies = recommendedMoviesData.movies;
      $scope.page = recommendedMoviesData.page;
      $scope.totalPages = recommendedMoviesData.totalPages;
    });
  }
}]);
