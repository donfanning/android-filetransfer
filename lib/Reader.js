'use strict';

const fs = require('fs');
const utils = require('./util');
const Cache = require('./Cache');
const CustomError = require('./CustomError');

class ReaderError extends CustomError {
    constructor(message) {
        super(message);
    }
}

class Reader {
    constructor(settings) {
        this.settings = {
            cache: true
        };
        this.cache = new Cache();
    }

    disable(key) {
        this.settings[key] = false;
    }

    enable(key) {
        this.settings[key] = true;
    }

    readFile(path, callback) {
        let self = this;

        if(self.settings.cache) {
            if(self.cache.get(path)) {
                return self.cache.get(path);
            }
        }

        fs.readFile(path, 'utf8', (err, content) => {
            if(err) {
                return callback(err);
            }

            if(self.settings.cache) {
                this.cache.set(path, content);
            }
            callback(null, content);
        });
    }

    readFileSync(path) {
        let self = this;

        if(self.settings.cache) {
            if(self.cache.get(path)) {
                return self.cache.get(path);
            }
        }

        try {
            let result = fs.readFileSync(path, { encoding: 'utf8' });
            self.cache.set(path, result);
            return {
                error: null,
                content: result
            };
        } catch(failed) {
            return {
                error: new ReaderError(failed.message),
                content: null
            }
        }
    }
}


exports = module.exports = Reader;
