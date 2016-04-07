'use strict';

angular.module('register.transactionView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/transaction/:transactionId', {
        templateUrl: 'transaction_view/transaction_view.html',
        controller: 'transactionViewCtrl'
    });
}])

.controller('transactionViewCtrl', ['$rootScope', '$scope', 'cornercouch', '$routeParams', 'config', function($rootScope, $scope, cornercouch, $routeParams, config) {
    $scope.db = $rootScope.couch.getDB(config.db);

    $scope.db.newDoc().load($routeParams.transactionId).success(function(transaction) {
        console.log(transaction);
        $scope.transaction = transaction;
        if (!$scope.transaction.total && $scope.transaction.items) {
            var total = 0;
            $scope.transaction.items.forEach(function(item) {
                if (!item.extended_price) {
                    item.extended_price = item.quantity * item.each_price;
                }
                total += item.extended_price || 0;
            });
            $scope.transaction.total = total;
        }
    });



}]);