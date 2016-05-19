'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const Cache = require('./Cache');
const AFTError = require('./AndroidFiletransferError');

class FileIndex {
    constructor(files) {
        this.errors = [];
        this.index = {};
        this.cache = new Cache();

        if(Array.isArray(files)) {
            this.bulk(files);
        }
    }

    add(filePath) {
        this.process(filePath);
    }

    get(filePath) {
        let result = this.cache.get(filePath);
        if(result) {
            return result;
        } else {
            result = this.index[filePath];
            this.cache.set(filePath, result);
            return result;
        }

        return null;
    }

    bulk(filePaths) {
        if(Array.isArray(filePaths)) {
            filePaths.forEach(fpath => this.process(fpath));
        } else if(typeof filePaths === 'string') {
            return this.process(filePaths);
        } else {
            this.errors.push(
                new AFTError([
                    `FileIndex.bulk: Must pass an array as argument,`,
                    `passed type ${typeof filePaths} instead.`
                ],join(' '))
            )
        }
    }

    process(file) {
        try {
            let stats = fs.statSync(file);
            let checksum = this._checksumAlgorithm(file, stats['size']);
            let index = this.index[file] = {
                checksum: checksum,
                size: stats['size'],
                blocks: stats['block'] || null,
                created: stats['birthtime'] || null,
                mode: stats['mode'],
                uid: stats['uid'] || null
            };

            return index;
        } catch(failed) {
            let err = new AFTError(`FileIndex.add: Adding ${file} failed - ${failed.message}`);
            err.filePath = filePath;
            err.reason = err.message;
            err.__error = err;
            this.errors.push(err);

            return false;
        }
    }

    _checksumAlgorithm(fpath, size, algorithm, encoding) {
        return crypto
            .createHash(algorithm || 'sha1')
            .update(FileIndex.CHECKSUM_PREFIX + '-' + fpath + '-' + size)
            .digest(encoding || 'hex');
    }
}

FileIndex.CHECKSUM_PREFIX = 'android-filetransfer';

exports = module.exports = FileIndex;
