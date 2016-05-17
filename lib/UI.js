'use strict';

const path = require('path');
const utils = require('./util');
const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;

class UI {
    constructor(options) {
        this.window = null;
        this.options = utils.default(options, {});
        this.options.views = options.views || path.join(__dirname, '..', 'views');
    }

    setViewBase(path) {
        if(!path) {
            return false;
        }

        this.options.view = path.join(__dirname, '..', path.normalize(path));
    }

    createWindow(options) {
        options = utils.default(options, {});
        this.window = new BrowserWindow(options);
        this.attachEventHandler();
    }

    loadView(name) {
        this.window.loadURL(`file://${path.join(this.options.views)}/${name}.html`);
    }

    openDevTools() {
        this.window.webContents.openDevTools();
    }

    attachEventHandler() {
        let mainWindow = this.window;

        this.window.on('closed', function () {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            mainWindow = null;
        });
    }
}

exports = module.exports = UI;
