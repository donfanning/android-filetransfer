(function() {
    'use strict';

    angular.module('AndroidFiletransfer')
        .service('syncService', [SyncService]);

    function SyncService() {
        return {
            // empty right now
        };
    }
})();
