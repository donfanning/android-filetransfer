'use strict';

const fs = require('fs');
const glob = require('glob');
const EventEmitter = require('events').EventEmitter;

class Watcher extends EventEmitter {
    constructor(files) {
        super();

        this.files = [];
        this.register(files)
    }

    register(files) {
        if(Array.isArray(files)) {
            this.files.concat(files);
        } else if(typeof files === 'string') {
            this.files.push(files);
        }
    }

    watch() {

    }

    unwatch() {

    }
}

exports = module.exports = Watcher;
