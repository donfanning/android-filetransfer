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
            $id: root.App.$id++
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
                component.factory.init();
            }
        });

        root.App.components.forEach(function(component) {
            if(component.factory.ready) {
                component.factory.ready();
            }
        });

        (done || function() {})();
    };

})(window);
