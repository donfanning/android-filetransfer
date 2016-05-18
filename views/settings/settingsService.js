(function() {
    'use strict';

    angular.module('AndroidFiletransfer')
        .service('settingsService', [SettingsService]);

    function SettingsService() {
        return {
            // empty right now
        };
    }
})();
