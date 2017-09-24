var app = angular.module('movieJacuzzi', ['ngResource', 'ui.router']);

app.config(function($stateProvider) {
  var rootState = {
    name: 'root',
    url: '',
    templateUrl: '/client/views/home-page.html'
  }
  var homePageState = {
    name: 'homePage',
    url: '/',
    templateUrl: '/client/views/home-page.html'
  }
  var moviePageState = {
    name: 'moviePage',
    url: '/movies/{movieId}',
    templateUrl: '/client/views/movie-page.html',
    controller: 'moviePageController',
  };
  $stateProvider.state(rootState);
  $stateProvider.state(homePageState);
  $stateProvider.state(moviePageState);
});
