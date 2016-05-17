'use strict';

const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

function getConfig() {
    return require(path.join(__dirname, 'build.json'));
};

function loadTask(task) {
	return require(path.join(__dirname, `${task}.js`))(gulp, plugins, getConfig());
};

exports = module.exports = {
    load: loadTask
};
