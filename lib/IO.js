'use strict';

const EventEmitter = require('events').EventEmitter;
const fs = require('fs');
const glob = require('glob');
const path = require('path');

class IO extends EventEmitter {
    constructor(device) {
        super();

        this.useExternalDevice(device);
    }

    useExternalDevice(device) {
        // TODO: Check for capability
        this.device = device;
    }
}

exports = module.exports = IO;
