'use strict';

angular.module('register.transactionEdit', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/transaction/:transactionId', {
        templateUrl: 'transaction_view/transaction_view.html',
        controller: 'transactionViewCtrl'
    });
}])

.controller('transactionViewCtrl', ['$rootScope', '$scope', 'cornercouch', '$routeParams', 'config', function($rootScope, $scope, cornercouch, $routeParams, config) {
    $scope.db = $rootScope.couch.getDB(config.db);

    $scope.transaction = $scope.db.getDoc($routeParams.transactionId);
    console.log($scope.transaction);
}]);