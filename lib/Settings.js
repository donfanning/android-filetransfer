'use strict';

const fs = require('fs');
const path = require('path');
const util = require('util');
const Path = require('./Path');
const Cache = require('./Cache');
const EventEmitter = require('events').EventEmitter;
const AFTError = require('./AndroidFiletransferError');

class Settings extends EventEmitter {
    constructor(path, settings) {
        super();

        this.path = null;
        this.dirty = false;
        this.pathinfo = null;
        this.settings = settings || {};
        this.cache = new Cache();

        this.id = null;
        this.name = null;
        this.created = new Date().toISOString();
        this.paths = [];

        if(typeof path === 'string') {
            this.use(path);

            if(this.settings.autosync !== false) {
                this.sync();
            }
        }
    }

    use(settingsPath) {
        if(typeof settingsPath !== 'string') {
            throw new AFTError('Settings.use: path is not a valid string');
            return false;
        }

        this.path = path.normalize(settingsPath);
        this.pathinfo = path.parse(settingsPath);
        this.sync();
    }

    sync() {
        this.emit('sync');

        if(this.dirty === true) {
            this._write();
        } else {
            this._read();
        }
    }

    addPath(factory) {
        this.paths.push(new Path(factory));
    }

    deletePath() {

    }

    serialize() {
        let serialized = {
            name: this.name,
            created: this.created,
            id: this.id,
            paths: []
        };

        this.paths.forEach(instance => serialized.paths.push(instance.serialize()));

        return serialized;
    }

    _read() {
        if(this.path !== null) {
            try {
                let result = fs.readFileSync(this.path, {
                    encoding: 'utf8'
                });

                result = result ? JSON.parse(result) : {};

                this.id = result.id;
                this.name = result.name;
                this.created = result.created;
                this._parsePaths(result.paths);

                this.content = result;
                this.emit('read', result);
            } catch(failed) {
                throw new AFTError(`Settings._read: ${failed.message}`);
            }
        }
    }

    _parsePaths(paths) {
        if(Array.isArray(paths)) {
            let self = this;
            paths.forEach(template => self.paths.push(new Path(template)));
        }
    }

    /**
     * Writes the current settings to the ressource file
     */
    _write() {
        if(this.path !== null) {
            try {
                fs.writeFileSync(this.path, JSON.stringify(this.serialize(), null, 4), {
                    encoding: 'utf8'
                });

                this.emit('write', this.content);
                this.dirty = false;
            } catch(failed) {
                this.dirty = true;
                throw new AFTError(`Settings._write: ${failed.message}`);
            }
        }
    }
}

//util.inherits(Settings, EventEmitter);


exports = module.exports = Settings;
