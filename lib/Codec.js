'use strict';

const utils = require('./util');
const jwt = require('jwt-simple');
const AndroidFiletransferError = require('./AndroidFiletransferError');

class CodecError extends AndroidFiletransferError {
    constructor(message) {
        super(message);
    }
}

class Codec {
    constructor(token) {
        this.token = token;
    }

    setToken(token) {
        this.token = token;
    }

    encode(content) {
        if(!this.token) {
            throw new CodecError('Token is missing for encode process');
        }

        return jwt.encode(content, this.token);
    }

    decode(content) {
        if(!this.token) {
            throw new CodecError('Token is missing for decode process.');
        }

        return jwt.decode(content, this.token);
    }
}


exports = module.exports = Codec;
