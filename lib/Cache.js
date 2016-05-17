'use strict';

const utils = require('./util');

class Cache {
    constructor(settings) {
        this.lastAccess = null;
        this.internal = {};
    }

    middleware() {
        this.lastAccess = new Date().toISOString();
    }

    get(key) {
        this.middleware();
        return this.internal[key];
    }

    set(key, value) {
        this.middleware();
        this.internal[key] = value;
    }

    clear() {
        this.middleware();
        this.internal = {};
    }
}


exports = module.exports = Cache;
