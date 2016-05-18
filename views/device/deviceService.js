(function() {
    'use strict';

    angular.module('AndroidFiletransfer')
        .service('deviceService', [DeviceService]);

    function DeviceService() {
        return {
            // empty right now
        };
    }
})();
