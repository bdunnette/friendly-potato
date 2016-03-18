'use strict';

angular.module('register.transactionEdit', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/transaction/:transactionId', {
    templateUrl: 'transaction_edit/transaction_edit.html',
    controller: 'transactionEditCtrl'
  });
}])

.controller('transactionEditCtrl', ['$rootScope', '$scope', 'cornercouch', '$routeParams', function($rootScope, $scope, cornercouch, $routeParams) {
  $scope.db = $rootScope.couch.getDB('test');
  if ($routeParams.transactionId === 'new') {
    $scope.transaction = $scope.db.newDoc();
  } else {
    $scope.transaction = $scope.db.getDoc($routeParams.transactionId);
  }
  console.log($scope.transaction);

  $scope.saveTransaction = function() {
    $scope.transaction.save().success(function() {
      console.log($scope.transaction);
    });
  };
}]);
