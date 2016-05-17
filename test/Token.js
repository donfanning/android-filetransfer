'use strict';

const Token = require('../lib/Token');

let instance = new Token();
instance.disable('cache');

console.log(instance.content);
