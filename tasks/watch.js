'use strict';

exports = module.exports = (gulp, plugins, config) => {
	return () => {
        config.process.forEach(asset => {
            gulp.watch(asset.scripts, ['compile:scripts']);
            gulp.watch(asset.styles, ['compile:styles']);
        });

        return gulp;
	};
};
