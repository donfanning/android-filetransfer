(function() {
    'use strict';

    angular.module('AndroidFiletransfer')
        .controller('syncController', ['$scope', 'syncService', SyncController]);

    function SyncController($scope, syncService) {
        $scope.message = 'SyncController';
    }
})();
