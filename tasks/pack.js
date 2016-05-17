'use strict';

const path = require('path');
const packager = require('electron-packager');
const pkg = require(path.join(__dirname, '..', 'package.json'));
const releasePath = path.join(__dirname, '..', 'release', `v${pkg.version}`);

exports = module.exports = (gulp, plugins, config) => {
	return (done) => {
        packager({
            arch: 'ia32',
            dir: './',
            platform:  'all',
            asar: true,
            overwrite: true,
            out: releasePath,
            name: `${pkg.packed}-v${pkg.version}`
        }, (err, paths) => {
            if(err) {
                return done(err);
            }

            console.log('Packed apps avaible under the paths: %s\n', paths.join('\n >> '));
            done();
        });
	};
};
