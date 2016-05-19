'use strict';

const path = require('path');
const Settings = require('../lib/Settings');
const Path = require('../lib/Path');

let instance = new Settings();
instance.use(path.join(__dirname, '..', 'data/settings/default.json'));

let examplePath = instance.paths[0];

examplePath.ignores = ['subdir'];
examplePath.extension = '*.txt';
examplePath.direction = Path.DIRECTION_BIDIRECTIONAL;

instance.addPath({
    remote: "/test/remote",
    local: "/test/local",
    flags: {
        extension: "**/*.*",
        ignore: []
    }
});

instance._write();

//console.log(instance);
console.log(instance.serialize())
