'use strict';

const fs = require('fs');
const utils = require('./util');
const Cache = require('./Cache');
const CustomError = require('./CustomError');

class WriterError extends CustomError {
    constructor(message) {
        super(message);
    }
}

class Writer {
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

    writeFile(dest, content, done) {
        fs.writeFile(dest, content, 'utf8', failed => {
            this.cache.set(dest, {
                error: failed,
                content: content
            });

            return done(failed);
        });
    }

    writeFileSync(dest, content) {
        try {
            fs.writeFileSync(dest, content, { encoding: 'utf8' });
            this.cache.set(dest, {
                error: null,
                content: content
            });
            return true;
        } catch(failed) {
            return {
                error: new WriterError(failed.message),
                done: false
            }
        }
    }
}


exports = module.exports = Writer;
