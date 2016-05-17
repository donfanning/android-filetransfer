// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const path = require('path');
const DOM = require('../../lib/DOM');
const Settings = require('../../lib/Settings');
const baseConfig = require(path.join(__dirname, '..', '..', 'content', 'config.json'));

let settings = new Settings(`${baseConfig.settings}.json`);

let viewModel = new DOM(document.body, {
    preventAutoload: true
}).bootstrap();
