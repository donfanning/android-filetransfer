'use strict';

const path = require('path');
const utils = require('./util');
const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;

function UI(options) {
    this.window = null;
    this.options = utils.default(options, {});
    this.options.views = options.views || path.join(__dirname, '..', 'views');
}

UI.prototype.createWindow = function(options) {
    options = utils.default(options, {});
    this.window = new BrowserWindow(options);
    this.attachEventHandler();
};

UI.prototype.loadView = function(name) {
    this.window.loadURL(`file://${path.join(this.options.views)}/${name}.html`);
};

UI.prototype.openDevTools = function() {
    this.window.webContents.openDevTools();
};

UI.prototype.attachEventHandler = function() {
    let mainWindow = this.window;

    this.window.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
};

exports = module.exports = UI;
