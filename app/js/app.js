'use strict';

// Declare app level module which depends on views, and components
angular.module('register', [
  'ngRoute',
  'register.view1',
  'register.view2',
  'CornerCouch'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]).
run(function($rootScope, cornercouch){
  $rootScope.couch = cornercouch();
  $rootScope.couch.session();
});
