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
        return this;
    }

    flush() {
        this.lastAccess = null;
        this.internal = {};
        return this;
    }

    get length() {
        return Object.keys(this.internal).length;
    }
}


exports = module.exports = Cache;
