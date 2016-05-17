'use strict';

const path = require('path');
const Reader = require('./IO').Reader;

class DOM {
    constructor(rootNode, options) {
        this.root = rootNode;
        this.options = options || {};

        if(!this.options.preventAutoload) {
            this.bootstrap();
        }

        return this; // enable chaining
    }

    setRootNode(rootNode) {
        if(!this.root) {
            this.root = rootNode;
        }

        return this; // enable chaining
    }

    bootstrap() {
        if(!this.root) {
            return false;
        }

        let self = this;
        let elements = document.querySelectorAll('.dom-load');

        for(let i = 0; i < elements.length; i++) {
            self.load(elements[i]);
        }

        return this; // enable chaining
    }

    load(node) {
        let include = node.getAttribute('path');
        let content = this.includeFile(path.join(__dirname, '..', 'views', include));
        node.removeAttribute('path');
        node.innerHTML = content;

        return this; // enable chaining
    }

    includeFile(path) {
        let result = new Reader().readFileSync(path);
        if(result.error) {
            return `<!-- Error: ${result.error.messsage} in DOM.includeFile -->`;
        } else {
            return result.content;
        }
    }
}

exports = module.exports = DOM;
