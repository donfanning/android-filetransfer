(function() {
    'use strict';

    const path = require('path');
    const templateUrl = path.join(__dirname, 'views');

    angular.module('AndroidFiletransfer', ['ngRoute', 'ngAnimate'])
        .config(['$routeProvider', function($routeProvider) {

            $routeProvider.when('/', {
                templateUrl: templateUrl + '/home/home.html',
                controller: 'homeController'
            });

            $routeProvider.when('/sync', {
                templateUrl: templateUrl + '/sync/sync.html',
                controller: 'syncController'
            });

            $routeProvider.when('/device', {
                templateUrl: templateUrl + '/device/device.html',
                controller: 'deviceController'
            });

            $routeProvider.when('/settings', {
                templateUrl: templateUrl + '/settings/settings.html',
                controller: 'settingsController'
            });

            $routeProvider.otherwise({ redirectTo: '/' });
        }]);
})();
