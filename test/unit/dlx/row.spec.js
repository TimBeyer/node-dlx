var Row = require('../../../src/lib/row').default;
var DataObject = require('../../../src/lib/data-object').default;

var _ = require('lodash');

describe('row', function () {

    it('exists', function () {
        should.exist(Row);
    });

    describe('when creating a row', function () {
        var row;

        beforeEach(function () {
            row = new Row();
        });

        describe('when appending a dataObject', function () {
            var dataObject;

            beforeEach(function () {
                dataObject = new DataObject();
                row.append(dataObject);
            });

            it('sets the dataObject to point to itself left and right', function () {
                dataObject.left.should.equal(dataObject);
                dataObject.right.should.equal(dataObject);
            });

            it('sets the first and last to the dataObject', function () {
                row.first.should.equal(dataObject);
                row.last.should.equal(dataObject);
            });
        });
        
        describe('when appending two dataObjects', function () {
            var dataObjects;

            beforeEach(function () {
                dataObjects = [];
                dataObjects[0] = new DataObject();
                dataObjects[1] = new DataObject();
                
                row.append(dataObjects[0]);
                row.append(dataObjects[1]);
            });

            it('sets the first dataObject to point to the other object left and right', function () {
                dataObjects[0].left.should.equal(dataObjects[1]);
                dataObjects[0].right.should.equal(dataObjects[1]);
            });

            it('sets the second dataObject to point to the other object left and right', function () {
                dataObjects[1].left.should.equal(dataObjects[0]);
                dataObjects[0].right.should.equal(dataObjects[1]);
            });

            it('sets the first and last to the dataObject', function () {
                row.first.should.equal(dataObjects[0]);
                row.last.should.equal(dataObjects[1]);
            });
        });

        describe('when appending three dataObjects', function () {
            var dataObjects;

            beforeEach(function () {
                dataObjects = [];
                dataObjects[0] = new DataObject();
                dataObjects[1] = new DataObject();
                dataObjects[2] = new DataObject();
                
                row.append(dataObjects[0]);
                row.append(dataObjects[1]);
                row.append(dataObjects[2]);
            });

            it('sets the first dataObject to point to the third object left and the second right', function () {
                dataObjects[0].left.should.equal(dataObjects[2]);
                dataObjects[0].right.should.equal(dataObjects[1]);
            });

            it('sets the second dataObject to point to the first object left and the third right', function () {
                dataObjects[1].left.should.equal(dataObjects[0]);
                dataObjects[1].right.should.equal(dataObjects[2]);
            });

            it('sets the third dataObject to point to the second object left and the first right', function () {
                dataObjects[2].left.should.equal(dataObjects[1]);
                dataObjects[2].right.should.equal(dataObjects[0]);
            });

            it('sets the first and last to the dataObject', function () {
                row.first.should.equal(dataObjects[0]);
                row.last.should.equal(dataObjects[2]);
            });
        });
    });
});
