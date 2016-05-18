(function(root, undefined) {
    'use strict';

    Components.Overlay = App.createComponent({
        ready: function() {
            var component = this;
            var $fadeOut = $('.component-overlay.js-fade-out');

            if(!$fadeOut || $fadeOut.length <= 0) {
                return false;
            } else if($fadeOut.length && $fadeOut.length > 1) {
                $fadeOut.each(function() {
                    component.processFadeOut($(this));
                });
            } else {
                component.processFadeOut($fadeOut);
            }
        },
        processFadeOut: function($node) {
            root.setTimeout(function() {
                $node.addClass('--hide');
            }, ($node.data('time') || 3000));
        }
    });
})(window);
