var Column = require('../../../src/lib/column').default;
var DataObject = require('../../../src/lib/data-object').default;

var _ = require('lodash');

describe('column', function () {

    it('exists', function () {
        should.exist(Column);
    });

    describe('when creating a column', function () {
        var column;
        var columnName = 'test';

        beforeEach(function () {
            column = new Column();
        });

        it('sets itself as the first and last entry', function () {
            column.first.should.equal(column);
            column.last.should.equal(column);
        });

        it('sets up and down on itself', function () {
            column.up.should.equal(column);
            column.down.should.equal(column);
        });

        describe('when appending a dataObject', function () {
            var dataObject;

            beforeEach(function () {
                dataObject = new DataObject();
                column.append(dataObject);
            });

            it('sets the dataObject to point to the header up and down', function () {
                dataObject.up.should.equal(column);
                dataObject.down.should.equal(column);
            });

            it('sets the last to the dataObject', function () {
                column.last.should.equal(dataObject);
            });
        });
        
        describe('when appending two dataObjects', function () {
            var dataObjects;

            beforeEach(function () {
                dataObjects = [];
                dataObjects[0] = new DataObject();
                dataObjects[1] = new DataObject();
                
                column.append(dataObjects[0]);
                column.append(dataObjects[1]);
            });

            it('sets the first dataObject to point to the header up and the other object down', function () {
                dataObjects[0].up.should.equal(column);
                dataObjects[0].down.should.equal(dataObjects[1]);
            });

            it('sets the second dataObject to point to the other object up and the header down', function () {
                dataObjects[1].up.should.equal(dataObjects[0]);
                dataObjects[1].down.should.equal(column);
            });

            it('sets last to the dataObject', function () {
                column.first.should.equal(column);
                column.last.should.equal(dataObjects[1]);
            });

        it('calculates the correct size', function () {
            column.size.should.eql(2);
        });
        });
    });
});
