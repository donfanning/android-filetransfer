(function(root, undefined) {
    'use strict';

    Components.UI = App.createComponent({
        $component: $('.component-ui'),
        show: function() {
            this.$component.removeClass('--fade-out').addClass('--fade-in');
        },
        hide: function() {
            this.$component.removeClass('--fade-in').addClass('--fade-out');
        }
    });
})(window);
