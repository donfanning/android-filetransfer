'use strict';

const fs = require('fs');
const tar = require('tar');
const path = require('path');
const chalk = require('chalk');
const async = require('async');
const pkg = require(path.join(__dirname, '..', 'package.json'));
const releasePath = path.join(__dirname, '..', 'release', `v${pkg.version}`);

let getDirectories = srcpath => {
    return fs.readdirSync(srcpath).filter(function(file) {
        return fs.statSync(path.join(srcpath, file)).isDirectory();
    });
};

exports = module.exports = (gulp, plugins, config) => {
	return (done) => {
        let packs = getDirectories(releasePath);
        async.each(packs, (item, callback) => {
            let target = `./release/v${pkg.version}/${item}.tar`;
            let destination = fs.createWriteStream(target);
            console.log(`> Packing ${chalk.cyan(item)} as tarball right now ...`);
            let packer = tar.Pack({ noProprietary: true })
                .on('error', err => { callback(err) })
                .on('end', () => { callback(null) });
        }, failed => {
            if(failed) {
                console.log(`> Packing to archive failed: ${chalk.red(failed.message)}`);
                return done(failed);
            }

            console.log('> All releases are packed now!');
            done();
        });
	};
};
