var chai = require('chai');
var expect = chai.expect;
var Cache = require('../lib/Cache');
var cache = null;

describe('Cache', function() {
    before(function() {
        cache = new Cache();
    });

    it('should create an empty cache', function() {
        var entries = Object.keys(cache.internal);
        expect(entries.length).to.equal(0);
    });

    it('should add a new entry with .set()', function() {
        cache.set('addNewEntry', 10);
        cache.set('addNewEntryList', ['Hey there!', undefined, { a: 'b' }]);

        expect(cache.get('addNewEntry')).to.equal(10);
        expect(cache.get('addNewEntryList')).to.deep.equal(['Hey there!', undefined, { a: 'b' }]);
    });

    it('should return the actual size by accessing .length', function() {
        cache.flush();

        var entries = [1, 2, 3, 4, 5];

        entries.forEach(function(entry) {
            cache.set(entry, entry * 2);
        });

        expect(cache.length).to.equal(entries.length);
    });

    it('should empty the cache by calling .flush()', function() {
        var oldCacheSize = cache.length;
        cache.flush();

        expect(oldCacheSize).to.equal(5);
        expect(cache.length).to.equal(0);
    });
});
