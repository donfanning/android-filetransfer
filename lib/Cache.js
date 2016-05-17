'use strict';

const utils = require('./util');

class Cache {
    constructor(settings) {
        this._storage = {};
    }

    get(key) {
        return this._storage[key];
    }

    set(key, value) {
        this._storage[key] = value;
    }

    clear() {
        this._storage = {};
    }
}


exports = module.exports = Cache;
