'use strict';

const electron = require('electron');
const Menu = electron.Menu;

class Navigation {
    constructor() {
        this.Engine = null;
        this.template = null;
    }

    setTemplate(template) {
        if(!Array.isArray(template)) {
            throw new Error(`Invalid Navigation template type ${typeof template}, requiring Array!`);
        }

        this.template = template;
    }

    attach(app) {
        this.Engine = app;
    }

    build() {
        let menu = Menu.buildFromTemplate(this.template);
        Menu.setApplicationMenu(menu);
        return menu;
    }
}

exports = module.exports = Navigation;
