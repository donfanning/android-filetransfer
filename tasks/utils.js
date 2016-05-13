'use strict';

const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

function getComponentFiles(mime) {
    let orderedRessources = [];
    let gulpBase = './app/client/components';
    let src = path.join(__dirname, '..', 'app', 'client', 'components');
    let filematch = mime === 'js' ? 'js' : '{css,sass,scss}';
    let components = fs.readdirSync(src).filter(file => {
        return fs.statSync(path.join(src, file)).isDirectory();
    });

    components.forEach(component => {
        orderedRessources.push(
            `${gulpBase}/${component}/${mime}/${component}.${filematch}`,
            `${gulpBase}/${component}/${mime}/${component}-*.${filematch}`
        );
    });

    return orderedRessources;
};

function getConfig() {
    return require(path.join(__dirname, 'build.json'));
};

function loadTask(task) {
	return require(path.join(__dirname, `${task}.js`))(gulp, plugins, getConfig());
};

exports = module.exports = {
    load: loadTask,
    getComponentFiles: getComponentFiles
};
