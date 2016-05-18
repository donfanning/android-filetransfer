'use strict';

const fs = require('fs');
const path = require('path');
const Cache = require('./Cache');
const AndroidFiletransferError = require('./AndroidFiletransferError');

class IOError extends AndroidFiletransferError {
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
                return callback(null, self.cache.get(path));
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
                return {
                    error: null,
                    fromCache: true,
                    content: self.cache.get(path)
                };
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
                error: new IOError(failed.message),
                content: null
            }
        }
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
            if(this.settings.cache) {
                this.cache.set(dest, {
                    error: null,
                    content: content
                });
            }

            return {
                error: null,
                done: true
            };
        } catch(failed) {
            return {
                error: new IOError(failed.message),
                done: false
            }
        }
    }
}

class BidirectionalFileIO {
    constructor(source) {
        this.cache = new Cache();
        this.reader = new Reader();
        this.writer = new Writer();
        this.source = source;
        this.settings = {
            cache: true
        };
    }

    read() {
        let result = this.reader.readFileSync(this.source);
        if(result.error) {
            return undefined;
        } else {
            if(this.settings.cache) {
                this.cache.set('value', result.content);
            }

            return result.content;
        }
    }

    write(content) {
        let result = this.writer.writeFileSync(this.source, content);
        if(result.error) {
            return false;
        } else {
            return true;
        }
    }
}

exports.Bidirectional = BidirectionalFileIO;
exports.Reader = Reader;
exports.Writer = Writer;
exports.Error = IOError;
