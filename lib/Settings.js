'use strict';

const path = require('path');
const Cache = require('./Cache');
const IO = require('./IO');
const AndroidFiletransferError = require('./AndroidFiletransferError');

class SettingsError extends AndroidFiletransferError {
    constructor(message) {
        super(message);
    }
}

class Settings {
    constructor(library) {
        if(!library) {
            throw new SettingsError('No settings defined to use');
        }

        this.ressource = path.join(__dirname, '..', 'content', 'settings', library);
        this.io = new IO.Bidirectional(this.ressource);
        this.cache = new Cache();
        this.settings = {
            cache: false
        };

        this.synchronize();
    }

    enable(key) {
        this.settings[key] = true;
    }

    disable(key) {
        this.settings[key] = false;
    }

    synchronize() {
        if(this.content) {
            this.io.write(JSON.stringify(this.content));
        } else {
            this.content = JSON.parse(this.io.read());
        }
    }

    get(key) {
        if(cache.get(key)) {
            return cache.get('key');
        } else {
            let result = this.content[key];
            if(this.settings.cache) {
                this.cache.set(key, result);
            }
            return result;
        }
    }

    set(key, token) {
        if(this.settings.cache) {
            this.cache.set(key, token);
        }
        this.ressource[key] = token;
    }
}

exports = module.exports = Settings;
