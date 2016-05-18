(function() {
    'use strict';

    angular.module('AndroidFiletransfer')
        .controller('deviceController', ['deviceService', DeviceController]);

    function DeviceController(deviceService) {
        // Empty controller right now
    }
})();
