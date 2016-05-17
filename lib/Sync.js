'use strict';

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
