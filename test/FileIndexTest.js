var chai = require('chai');
var expect = chai.expect;

var path = require('path');
var FileIndex = require('../lib/FileIndex');
var index = null;

describe('FileIndex', function() {
    beforeEach(function() {
        index = new FileIndex();
    });

    it('should have a checksum prefix', function() {
        expect(FileIndex.CHECKSUM_PREFIX).to.not.be.undefined;
        expect(FileIndex.CHECKSUM_PREFIX).to.have.length.above(0);
    });

    it('should index a single file with .add()', function() {
        var testFile = path.join(__dirname, 'data/indexing/test.txt')
        index.add(testFile);

        var result = index.get(testFile);

        expect(result).to.exist;
        expect(result.checksum).to.not.be.undefined;
        expect(result.checksum).to.have.length.above(0);
    });
});
