'use strict';

const EventEmitter = require('events').EventEmitter;
const AFTError = require('./AndroidFiletransferError');

class Path extends EventEmitter {
    constructor(initial) {
        super();

        this.timestamp = new Date().toISOString();
        this.local = null;
        this.remote = null;
        this.flags = {};

        if(typeof initial === 'object') {
            this.parse(initial);
        }
    }

    serialize() {
        let serialized = {
            flags: this.flags,
            local: this.local,
            remote: this.remote,
            timestamp: new Date().toISOString()
        };

        return serialized;
    }

    parse(factory) {
        if(typeof factory === 'string') {
            try {
                factory = JSON.parse(factory);
            } catch(failed) {
                throw new AFTError(`Path.load: ${failed.message}`);
            }
        }

        this.timestamp = factory.timestamp || new Date().toISOString();
        this.local = factory.local;
        this.remote = factory.remote;
        this.flags = factory.flags;
    }

    set ignores(ignores) {
        this.flags.ignore = Array.isArray(ignores) ?
            ignores : [ignores];
    }

    get ignores() {
        return this.flags.ignore;
    }

    set direction(direction) {
        this.flags.direction = direction;
    }

    get direction() {
        return this.flags.direction;
    }

    set extension(extensions) {
        this.flags.extension = Array.isArray(extensions) ?
            `.{${extensions.join(',')}}` : extensions;
    }

    get extension() {
        return this.flags.extension;
    }
}

Path.DIRECTION_BIDIRECTIONAL = 0;
Path.DIRECTION_TO_LOCAL = 1;
Path.DIRECTION_TO_REMOTE = 2;

exports = module.exports = Path;
