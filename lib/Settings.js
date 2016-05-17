'use strict';

const utils = require('./util');
const Codec = requrie('./Codec');

class Settings {
    constructor(settings) {
        this._mirror = {};
        this.load(settings);
    }

    load(settings) {
        let self = this;
        if(typeof settings === 'object') {
            for(let key in settings) {
                if(settings.hasOwnProperty(key)) {
                    self[key] = settings[key];
                }

                this._mirror[key] = settings[key];
            }
        }
    }

    serialize() {
        return JSON.stringify(this._mirror);
    }

    deserialize(serialized) {
        this.load(JSON.parse(serialied));
    }
}


exports = module.exports = Settings;
