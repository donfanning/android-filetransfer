(function(root, undefined) {
    'use strict';

    root.$ = root.jQuery = require('jquery');

    root.Components = {};
    root.App = {
        components: [],
        $id: 0
    };

    root.App.createComponent = function(factory) {
        var instance = {
            factory: factory,
            $id: root.App.$id++,
            isReady: false,
            isInitialized: false
        };

        for(var key in factory) {
            if(key !== '$id' && key !== 'factory') {
                instance[key] = factory[key];
            }
        }

        root.App.components.push(instance);
        return instance;
    };

    root.App.start = function(done) {
        root.App.components.forEach(function(component) {
            if(component.factory.init) {
                (component.factory.init || function() {})(component);
            }

            component.isInitialized = true;
        });

        root.App.components.forEach(function(component) {
            if(component.factory.ready) {
                (component.factory.ready || function() {})(component);
            }

            component.isReady = true;
        });

        (done || function() {})();
    };

})(window);
