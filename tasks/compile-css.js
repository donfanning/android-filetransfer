'use strict';

const utils = require('./utils');
const autoprefixer = require('autoprefixer');

exports = module.exports = (gulp, plugins, config) => {
    let processors = [
        autoprefixer({
            browsers: [
                '> 1%',
                'last 2 versions',
                'ie 9',
                'android 4',
                'Firefox ESR',
                'Opera 12.1'
            ],
            cascade: true
        })
    ];

	return () => {
        config.process.forEach(asset => {
            console.log(`Running style compilation for ${asset.name} ...`);
            gulp.src(asset.styles)
                .pipe(plugins.plumber())
                .pipe(plugins.cached(`${asset.name}:css`))
                .pipe(plugins.sourcemaps.init({loadMaps: true}))
                .pipe(plugins.sass({ outputStyle: 'expanded' }).on('error', plugins.sass.logError))
                .pipe(plugins.postcss(processors))
                .pipe(plugins.remember(`${asset.name}:css`))
                .pipe(plugins.concat(`${asset.name}.css`))
                .pipe(plugins.sourcemaps.write('.'))
                .pipe(gulp.dest(config.release));
        });

        return gulp;
	};
};
