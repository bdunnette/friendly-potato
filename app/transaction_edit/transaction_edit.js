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
            date: new Date(),
            transaction_type: "Sale",
            items: [],
            total: 0
        });
        // Still need to find effective sales tax - example query:
        // http://localhost:5984/fgtc/_design/register/_view/taxes?limit=1&reduce=false&descending=true&startkey="2016-03-18"
    } else {
        $scope.transaction = $scope.db.getDoc($routeParams.transactionId);
    }
    console.log($scope.transaction);

    $scope.newItem = {
        quantity: 1
    };

    $scope.addItem = function() {
        var insertItem = angular.copy($scope.newItem);
        if ($scope.transaction.items) {
            $scope.transaction.items.push(insertItem);
        } else {
            $scope.transaction.items = [insertItem];
        }

        if ($scope.transaction.total) {
            $scope.transaction.total += insertItem.extended_price;
        } else {
            $scope.transaction.total = insertItem.extended_price;
        }

        $scope.transaction.save();
    };

    $scope.updatePrices = function(extended_price) {
        if (extended_price) {
            $scope.newItem.each_price = $scope.newItem.extended_price / $scope.newItem.quantity
        } else {
            $scope.newItem.extended_price = $scope.newItem.each_price * $scope.newItem.quantity
        }
        console.log($scope.newItem);
    };

    $scope.saveTransaction = function() {
        $scope.transaction.save().success(function() {
            console.log($scope.transaction);
        });
    };
}]);