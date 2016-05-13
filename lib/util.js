'use strict';

exports.default = (input, fallback, typecheck) => {
    typecheck = typecheck || false;

    if(typecheck) {
        if(typeof input !== typeof fallback) {
            return false;
        }
    }

    if(input && input !== undefined && input !== null) {
        return input;
    } else {
        return fallback;
    }
};
