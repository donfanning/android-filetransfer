'use strict';

exports = module.exports = (gulp, plugins, config) => {
    return () => {
        for(let dest in config.copy) {
            gulp.src(config.copy[dest])
                .pipe(plugins.plumber())
                .pipe(plugins.newer(dest))
                .pipe(gulp.dest(dest));
        }

        return gulp;
    };
};
