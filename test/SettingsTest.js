'use strict';

var path = require('path');
var chai = require('chai');
var expect = chai.expect;

var Settings = require('../lib/Settings');
var Path = require('../lib/Path');

var instance = new Settings();
var settingsPath = path.join(__dirname, 'data/settings/example.json');

describe('Settings', function() {
    beforeEach(function() {
        instance = new Settings();
        instance.use(settingsPath);
    });

    it('should load a settings file with .use()', function() {
        expect(instance).to.not.be.undefined;
    });

    it('should have exactly one path entry', function() {
        expect(instance.paths.length).to.be.equal(1);
    });

    it('should add a new path factory with .addPath()', function() {
        var examplePath = instance.paths[0];

        examplePath.ignores = ['subdir'];
        examplePath.extension = '*.txt';
        examplePath.direction = Path.DIRECTION_BIDIRECTIONAL;

        instance.addPath({
            remote: "/test/remote",
            local: "/test/local",
            flags: {
                direction: 0,
                extension: "**/*.{css, js}",
                ignore: ["!*.txt", "!ignore"]
            }
        });

        expect(instance.paths.length).to.equal(2);
        expect(instance.paths[1]).to.not.be.undefined;
        expect(instance.paths[1].remote).to.equal('/test/remote');
    });

    it('should return the observalbe paths as array', function() {
        instance.addPath({
            remote: "/test/remote/path/sync/",
            local: "/test/local/path/sync/",
            flags: {
                recursive: true,
                direction: 0,
                extension: ['css', 'js'],
                ignore: ["!*.txt", "!ignore"]
            }
        });

        let paths = instance.paths[1].getObservable();

        expect(paths).to.not.be.undefined;
        expect(paths.length).to.equal(6);
        expect(paths[0]).to.contain('/test/remote/path/sync/**/*.{css,js}');
    });
});
