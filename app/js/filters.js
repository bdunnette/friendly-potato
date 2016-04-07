angular.module('registerFilters', []).filter('arrayDate', function() {
    return function(input) {
        if (Array.isArray(input)) {
            var date = new Date(input[0], input[1] - 1, input[2]);
            return date;
        } else {
            return input;
        }
    };
});