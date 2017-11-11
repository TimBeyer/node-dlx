var _ = require('lodash');

var DataObject = require('./data-object');

var Column = require('./column');
var Row = require('./row');

var createDataObjects = function createDataObjects (constraint) {

    var primaryConstraints = _.map(constraint.row || constraint.primaryRow, function (isActive) {
        if (isActive) {
            var dataObject = new DataObject(constraint, false);
            return dataObject;
        }
        else {
            return undefined;
        }
    });

    var secondaryConstraints = _.map(constraint.secondaryRow || [], function (isActive) {
        if (isActive) {
            var dataObject = new DataObject(constraint, true);
            return dataObject;
        }
        else {
            return undefined;
        }
    });
    return primaryConstraints.concat(secondaryConstraints);
};

var createMatrix = function createMatrix (constraints) {
    var root = new DataObject();
    root.type = 'Root';

    var headerRow = new Row(true);
    headerRow.append(root);

    var dataObjectRows = _.map(constraints, createDataObjects);
    var width = dataObjectRows[0].length;
    var columnArray = _.map(_.range(0, width), function (index) {
        return _.compact(_.map(dataObjectRows, function (dataObjectRow) {
            return dataObjectRow[index];
        }));
    });

    var columns = _.map(columnArray, function (dataObjects, i) {
        // console.log(dataObjects[0])
        var column = new Column(i, dataObjects[0].isOptional);
        _.each(dataObjects, column.append.bind(column));

        return column;
    });

    _.each(columns, headerRow.append, headerRow);

    var rows = _.map(dataObjectRows, function (dataObjectRow) {
        var dataObjects = _.compact(dataObjectRow);
        var row = new Row();
        _.each(dataObjects, row.append, row);

        return row;
    });

    return root;
};

module.exports = createMatrix;
