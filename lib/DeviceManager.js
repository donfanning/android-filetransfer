'use strict';

const EventEmitter = require('events').EventEmitter;
const _ = require('lodash');
const USB = require('usb');
const USBDetection = require('usb-detection');
const utils = require('./util');

// Singleton pattern for only having one DeviceManager
// at the same time to prevent connection issues.
let DeviceManagerInstance = null;

class DeviceManager extends EventEmitter {
    constructor() {
        super();

        this.devices = null;
        this.detector = USBDetection;
        this.connector = USB;
        this.setup();
    }

    setup() {
        // Stop monitoring process by default to prevent
        // CPU overload and constant fetching.
        this.detector.stopMonitoring();
        this.connector.setDebugLevel(1);
    }

    list(handler) {
        this.detector.find().then((handler || util.noop));
        return this; // enable chaining
    }

    getDevice(vendorID, productID) {
        if(_.isObject(vendorID)) {
            productID = vendorID.productId;
            vendorID = vendorID.vendorId;
        }

        return this.connector.findByIds(vendorID, productID);
    }

    watch() {
        this.detector.startMonitor();
        return this;
    }

    unwatch() {
        this.detector.stopMonitoring();
        return this;
    }
}

DeviceManagerInstance = DeviceManagerInstance === null ?
    new DeviceManager() : DeviceManagerInstance;

module.exports = DeviceManagerInstance;
