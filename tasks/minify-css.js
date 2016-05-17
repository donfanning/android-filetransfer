'use strict';

exports = module.exports = (gulp, plugins, config) => {
	return () => {
        config.process.forEach(asset => {
            gulp.src(`${config.release}/${asset.name}.css`)
                .pipe(plugins.cssnano())
                .pipe(plugins.rename(`${asset.name}.min.css`))
                .pipe(plugins.size({showFiles: true, gzip: false, title: 'CSS minified'}))
                .pipe(gulp.dest(config.release));
        });

        return gulp;
	};
};
