'use strict';

const usb = require('usb');
const detection = require('usb-detection');
const AFTError = require('./AndroidFiletransferError');

class Device {
    constructor() {
        this.devices = {};
    }

    static list(done) {
        detection.find().then(devices => done(devices));
    }
}

exports = module.exports = Device;
