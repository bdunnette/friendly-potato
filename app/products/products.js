'use strict';

angular.module('register.products', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/products', {
    templateUrl: 'products/products.html',
    controller: 'productsCtrl'
  });
}])

.controller('productsCtrl', ['$rootScope', '$scope', 'cornercouch', 'config', function($rootScope, $scope, cornercouch, config) {
  $scope.db = $rootScope.couch.getDB(config.db);
  
  $scope.db.query("register", "products", {
    include_docs: true
  });
  
  console.log($scope.db);
}]);
