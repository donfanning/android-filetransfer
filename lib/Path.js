'use strict';

const path = require('path');
const AFTError = require('./AndroidFiletransferError');

class Path {
    constructor(initial) {
        this.timestamp = new Date().toISOString();
        this.local = null;
        this.remote = null;
        this.recursive = null;
        this.flags = {};

        if(typeof initial === 'object') {
            this.parse(initial);
        }
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
        this.recursive = factory.recursive;
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

    getObservable() {
        let list = [];
        let pattern = this.flags.recursive ? '**/*' : '*';
        let extension = pattern + '.' + this.extension;
        let ignores = this.ignores;
        let remote = path.resolve(this.remote);
        let local = path.resolve(this.local);

        if(this.direction === Path.DIRECTION_TO_LOCAL) {
            list.push([remote, extension].join(path.sep));
            ignores.forEach(ignore => {
                list.push([remote, ignore].join(path.sep));
            });
        } else if(this.direction === Path.DIRECTION_TO_REMOTE) {
            list.push([local, extension].join(path.sep));
            ignores.forEach(ignore => {
                list.push(['!' + local, ignore].join(path.sep));
            });
        } else if(this.direction === Path.DIRECTION_BIDIRECTIONAL || which === undefined) {
            // This will be the default direction if nothing defined (bidirectional)
            list = list.concat([
                [remote, extension].join(path.sep),
                [local, extension].join(path.sep)
            ]);

            ignores.forEach(ignore => {
                list.push(['!' + remote, ignore].join(path.sep));
                list.push(['!' + local, extension].join(path.sep));
            });
        }

        return list;
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

    }

    set extension(extensions) {
        this.flags.extension = extensions;
    }

    get extension() {
        return Array.isArray(this.flags.extension) ?
            `{${this.flags.extension.join(',')}}` : this.flags.extension;
    }
}

Path.DIRECTION_BIDIRECTIONAL = 0;
Path.DIRECTION_TO_LOCAL = 1;
Path.DIRECTION_TO_REMOTE = 2;

exports = module.exports = Path;
