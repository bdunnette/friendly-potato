'use strict';

angular.module('register.transactionEdit', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/transaction/:transactionId', {
    templateUrl: 'transaction_edit/transaction_edit.html',
    controller: 'transactionEditCtrl'
  });
}])

.controller('transactionEditCtrl', ['$rootScope', '$scope', 'cornercouch', function($rootScope, $scope, cornercouch) {

}]);
