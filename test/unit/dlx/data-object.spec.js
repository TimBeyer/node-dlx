var DataObject = require('../../../src/lib/data-object').default;

describe('data-object', function () {

    it('exists', function () {
        should.exist(DataObject);
    });

    describe('when creating a data-object', function () {
        it('has the right properties', function () {
            var dataObject = new DataObject('test');
            dataObject.data.should.eql('test');
        });
    });
});
