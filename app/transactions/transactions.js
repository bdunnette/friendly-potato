'use strict';

angular.module('register.transactionList', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/transactions', {
    templateUrl: 'transactions/transactions.html',
    controller: 'transactionListCtrl'
  });
}])

.controller('transactionListCtrl', ['$rootScope', '$scope', 'cornercouch', 'config', function($rootScope, $scope, cornercouch, config) {
  $scope.db = $rootScope.couch.getDB(config.db);
  $scope.newSlide = $scope.db.newDoc({
    type: 'slide'
  });

  $scope.db.query("register", "transactions", {
    include_docs: true
  });
}]);
