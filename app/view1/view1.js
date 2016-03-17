'use strict';

angular.module('register.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$rootScope', '$scope', 'cornercouch', function($rootScope, $scope, cornercouch) {
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
