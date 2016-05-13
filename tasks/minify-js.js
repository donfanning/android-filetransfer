'use strict';

exports = module.exports = (gulp, plugins, config) => {
	return () => {
        config.process.forEach(asset => {
            gulp.src(`${config.release}/${asset.name}.js`)
                .pipe(plugins.uglify())
                .pipe(plugins.rename(asset.name.replace('.js', '.min.js')))
                .pipe(plugins.size({showFiles: true, gzip: false, title: 'JavaScript minified'}))
                .pipe(gulp.dest(config.release));
        });

        return gulp;
	};
};
