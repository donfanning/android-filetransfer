(function() {
    'use strict';

    const DeviceManager = require('./lib/DeviceManager');

    angular.module('AndroidFiletransfer')
        .controller('deviceController', ['deviceService', '$scope', DeviceController]);

    function DeviceController(deviceService, $scope) {
        DeviceManager.list(function(devices) {
            $scope.devices = devices;
        });
    }
})();
