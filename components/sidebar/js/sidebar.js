(function(root, undefined) {
    'use strict';

    Components.Sidebar = App.createComponent({
        icons: {
            collapse: 'keyboard_arrow_left',
            reveal: 'keyboard_arrow_right'
        },
        collapse: function($sidebar) {
            $sidebar = $sidebar || this.$node;
            $sidebar.removeClass('--reveal').addClass('--collapse');
            $sidebar.find('.swap-collapsable-icon')
                .removeClass(this.icons.collapse)
                .addClass(this.icons.reveal);
                $sidebar.find('.action-collapse-reveal')
                    .attr('ng-click', 'actions.reveal()')
        },
        reveal: function($sidebar) {
            $sidebar = $sidebar || this.$node;
            $sidebar.removeClass('--collapse').addClass('--reveal');
            $sidebar.find('.swap-collapsable-icon')
                .removeClass(this.icons.reveal)
                .addClass(this.icons.collapse);
            $sidebar.find('.action-collapse-reveal')
                .attr('ng-click', 'actions.collapse()')
        },
        ready: function(module) {
            module.$node = $('.component-sidebar');
        }
    });

    angular.module('AndroidFiletransfer')
        .controller('SidebarController', ['$scope', function($scope) {
            var $node = $('.component-sidebar');

            $scope.actions = {
                collapse: function() {
                    Components.Sidebar.collapse($node);
                },
                reveal: function() {
                    Components.Sidebar.reveal($node);
                },
                quit: function() {
                    require('electron').remote.app.quit();
                }
            };
        }]);
})(window);
