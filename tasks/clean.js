'use strict';

const del = require('del');

exports = module.exports = (gulp, plugins, config) => {
	return () => {
        return del(`${config.release}/**/*`);
    }
};
