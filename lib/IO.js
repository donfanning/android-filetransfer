'use strict';

const Cache = require('./Cache');
const Reader = require('./Reader');
const Writer = require('./Writer');
const CustomError = require('./CustomError');

class IOError extends CustomError {
    constructor(message) {
        super(message);
    }
}

class IO {
    constructor(source) {
        this.cache = new Cache();
    }
}
