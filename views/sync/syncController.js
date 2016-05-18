(function() {
    'use strict';

    angular.module('AndroidFiletransfer')
        .controller('syncController', ['syncService', SyncController]);

    function SyncController(syncService) {
        // Empty controller right now
    }
})();
