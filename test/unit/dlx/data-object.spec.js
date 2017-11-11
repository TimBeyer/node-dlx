var DataObject = require('../../../src/lib/data-object');
var _ = require('lodash');

describe('data-object', function () {

    it('exists', function () {
        should.exist(DataObject);
    });

    describe('when creating a data-object', function () {
        it('has the right properties', function () {
            var dataObject = new DataObject('test');
            dataObject.data.should.eql('test');
        });

        it('sets its type to DataObject', function () {
            var dataObject = new DataObject('test');
            dataObject.type.should.eql(DataObject.type);
        })
    });
});
