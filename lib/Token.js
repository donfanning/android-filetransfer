'use strict';

const path = require('path');
const Cache = require('./Cache');
const Writer = require('./Writer');
const Reader = require('./Reader');

class Token {
    constructor(library) {
        this.ressource = path.join(__dirname, '..', 'content', (library || 'token.json'));
        this.cache = new Cache();
        this.synchronize();
    }

    synchronize() {
        if(this.content) {
            new Writer().writeFileSync(this.ressource, this.content);
        } else {
            this.content = new Reader().readFileSync(this.ressource);
        }
    }

    get(key) {
        if(cache.get(key)) {
            return cache.get('key');
        } else {
            let result = this.content[key];
            this.cache.set(key, result);
            return result;
        }
    }

    set(key, token) {
        this.cache.set(key, token);
        this.ressource[key] = token;
    }
}
