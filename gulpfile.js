'use strict';

const env = process.env.NODE_ENV;
const gulp = require('gulp');
const chalk = require('chalk');
const utils = require('./tasks/utils');

console.log([
    '', `Buildscript is running in ${chalk.green(env) || 'Unknown'} environement!`, ''
].join('\n'));

gulp.task('compile:scripts', utils.load('compile-js'));
gulp.task('compile:styles', utils.load('compile-css'));
gulp.task('compile', ['compile:scripts', 'compile:styles']);

gulp.task('minify:scripts', utils.load('minify-js'));
gulp.task('minify:styles', utils.load('minify-css'));
gulp.task('minify', ['minify:scripts', 'minify:styles']);

gulp.task('clean', utils.load('clean'));
gulp.task('watch', utils.load('watch'));
gulp.task('copy', utils.load('copy'));

gulp.task('build', ['clean', 'copy', 'compile', 'minify']);
gulp.task('develop', ['build', 'watch']);

gulp.task('default', [env === 'development' ? 'develop' : 'build']);
