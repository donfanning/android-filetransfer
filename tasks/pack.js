'use strict';

const path = require('path');
const asar = require('asar');
const pkg = require(path.join(__dirname, '..', 'package.json');
const releasePath = path.join(__dirname, '..', 'release', pkg.version);
const destination = path.join(releasePath, `${pkg.packed}.asar`);

exports = module.exports = (gulp, plugins, config) => {
	return (done) => {
        asar.createPackage('./')

        done();
	};
};
