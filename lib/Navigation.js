'use strict';

const electron = require('electron');
const Menu = electron.Menu;

function Navigation() {
    this.Engine = null;
    this.template = null;
}

Navigation.prototype.setTemplate = function(template) {
    if(!Array.isArray(template)) {
        throw new Error(`Invalid Navigation template type ${typeof template}, requiring Array!`);
    }

    this.template = template;
};

Navigation.prototype.attach = function(app) {
    this.Engine = app;
};

Navigation.prototype.build = function() {
    let menu = Menu.buildFromTemplate(this.template);
    Menu.setApplicationMenu(menu);
    return menu;
};

exports = module.exports = Navigation;
