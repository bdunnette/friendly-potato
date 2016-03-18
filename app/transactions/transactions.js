'use strict';

angular.module('register.transactionList', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/transactions', {
    templateUrl: 'transactions/transactions.html',
    controller: 'transactionListCtrl'
  });
}])

.controller('transactionListCtrl', ['$rootScope', '$scope', 'cornercouch', function($rootScope, $scope, cornercouch) {
  $scope.db = $rootScope.couch.getDB('test');
  $scope.newSlide = $scope.db.newDoc({
    type: 'slide'
  });

  $scope.db.query("register", "transactions", {
    include_docs: true
  });

  $scope.submitEntry = function() {
    var now = new Date();
    var now = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),
      now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
    $scope.newentry.utc = $filter('date')(now, 'yyyy-MM-dd HH:mm:ss');

    $scope.newentry.save().success(function() {
      delete $scope.errordata;
      $scope.detail = $scope.newentry;
      $scope.newSlide = $scope.db.newDoc({
        type: 'slide'
      });
      $scope.db.query("register", "transactions", {
        include_docs: true
      });
    });
  };
}]);
