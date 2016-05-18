(function() {
    'use strict';

    const path = require('path');
    const templateUrl = path.join(__dirname, 'views');

    angular.module('AndroidFiletransfer', ['ngRoute'])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: templateUrl + '/home/home.html',
                controller: 'homeController'
            });

            $routeProvider.otherwise({ redirectTo: '/' });
        }]);
})();
