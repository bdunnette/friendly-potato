'use strict';

// Declare app level module which depends on views, and components
angular.module('register', [
    'ngRoute',
    'CornerCouch',
    'schemaForm',
    'registerFilters',
    'register.transactionList',
    'register.transactionView',
    'register.transactionEdit',
    'register.products',
    'register.taxes'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({
        redirectTo: '/'
    });
}]).
run(function($rootScope, cornercouch) {
    $rootScope.couch = cornercouch();
    $rootScope.couch.session();
    $rootScope.dbName = '';
});

var Config = {
    'db': 'fgtc'
};

angular.module('register').constant('config', Config);
