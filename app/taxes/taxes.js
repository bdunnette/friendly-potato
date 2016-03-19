'use strict';

angular.module('register.taxes', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/taxes', {
    templateUrl: 'taxes/taxes.html',
    controller: 'taxesCtrl'
  });
}])

.controller('taxesCtrl', ['$rootScope', '$scope', 'cornercouch', 'config', function($rootScope, $scope, cornercouch, config) {
  $scope.db = $rootScope.couch.getDB(config.db);

  $scope.db.query("register", "taxes", {
    include_docs: true
  });
}]);
