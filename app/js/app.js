'use strict';

// Declare app level module which depends on views, and components
angular.module('register', [
  'ngRoute',
  'register.transactionList',
  'register.transactionEdit',
  'register.products',
  'register.taxes',
  'CornerCouch'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/transactions'});
}]).
run(function($rootScope, cornercouch){
  $rootScope.couch = cornercouch();
  $rootScope.couch.session();
  $rootScope.dbName = '';
});

var Config = {
    'db': 'fgtc'
};

angular.module('register').constant('config', Config);
