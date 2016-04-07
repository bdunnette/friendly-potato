'use strict';

angular.module('register.transactionEdit', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/transaction/:transactionId/edit', {
        templateUrl: 'transaction_edit/transaction_edit.html',
        controller: 'transactionEditCtrl'
    });
}])

.controller('transactionEditCtrl', ['$rootScope', '$scope', 'cornercouch', '$routeParams', 'config', function($rootScope, $scope, cornercouch, $routeParams, config) {
    $scope.db = $rootScope.couch.getDB(config.db);

    if ($routeParams.transactionId === 'new') {
        $scope.transaction = $scope.db.newDoc({
            date: new Date()
        });
        // Still need to find effective sales tax - example query:
        // http://localhost:5984/fgtc/_design/register/_view/taxes?limit=1&reduce=false&descending=true&startkey="2016-03-18"
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