'use strict';

const fs = require('fs');
const IO = require('./IO');
const path = require('path');
const utils = require('./util');

class Sync {
    constructor(settings) {
        this.settings = settings || {};
    }

    loadSettings(settings) {
        this.settings = settings || this.settings || {};
    }
}


exports = module.exports = Sync;
