angular.module('underscore', [])
    .factory('_', ['$window', function ($window) {
        return $window._;
    }]);

angular.module('jquery', [])
    .factory('$', ['$window', function ($window) {
        return $window.$;
    }]);

var hackathonApp = angular.module('hackathonApp', ['ngRoute', 'ngAnimate', 'underscore', 'jquery', 'ui.bootstrap', 'ngMap']);

