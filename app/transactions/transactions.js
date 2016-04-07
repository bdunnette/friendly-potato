'use strict';

angular.module('register.transactionList', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'transactions/transactions.html',
        controller: 'transactionListCtrl'
    });
}])

.controller('transactionListCtrl', ['$rootScope', '$scope', 'cornercouch', 'config', function($rootScope, $scope, cornercouch, config) {
    $scope.db = $rootScope.couch.getDB(config.db);

    $scope.db.query("register", "transactions", {
        include_docs: true,
        descending: true,
        limit: 20
    });

    $scope.nextClick = function() {
        $scope.db.queryNext();
    };
    $scope.prevClick = function() {
        $scope.db.queryPrev();
    };
    $scope.moreClick = function() {
        $scope.db.queryMore();
    };
}]);