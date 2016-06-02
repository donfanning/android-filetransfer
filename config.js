'use strict';

const path = require('path');

exports = module.exports = {
    window: {
        width: 800,
        height: 600,
        title: 'Android Filetransfer',
        resizable: true,
        center: true,
        icon: path.join(__dirname, 'assets/img/appicon.png')
    },
    osx: {
        icon: path.join(__dirname, 'assets/img/appicon.png')
    }
};
