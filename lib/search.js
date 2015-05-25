var _ = require('lodash');
var searchMatrix = function searchMatrix (root, findAll) {
    var chooseColumn = function () {
        var smallestColumn = root.right;

        var currentColumn = root.right;
        while (currentColumn !== root) {
            if (currentColumn.size < smallestColumn.size) {
                smallestColumn = currentColumn;
            }
            currentColumn = currentColumn.right;
        }
        return smallestColumn;
    };


    var doSearch = function doSearch () {
        var objects = [];
        var results = [];
        var stopped = false;


        (function search (k) {
            if (root === root.right) {
                var result = [];
                _.each(_.range(0, k), function (i) {
                    var o = objects[i];
                    result.push(o.data);
                });
                results.push(result);
                if (!findAll) {
                    stopped = true;
                }
                return;
            }

            if (stopped) {
                return;
            }
            var currentColumnHeader;
            var dataObject;
            var neighbor;


            currentColumnHeader = chooseColumn();
            currentColumnHeader.cover();

            dataObject = currentColumnHeader.down;

            while (dataObject !== currentColumnHeader) {
                objects[k] = dataObject;

                neighbor = dataObject.right;
                while (neighbor !== dataObject) {
                    neighbor.columnHeader.cover();
                    neighbor = neighbor.right;
                }

                if (!stopped) {
                    search(k + 1);
                }

                dataObject = objects[k];
                currentColumnHeader = dataObject.columnHeader;

                neighbor = neighbor.left;
                while (neighbor !== dataObject) {
                    neighbor.columnHeader.uncover();
                    neighbor = neighbor.left;
                }

                dataObject = dataObject.down;
            }

            currentColumnHeader.uncover();


            return;
        })(0);

        var result = findAll ? results : results[0];
        return result;
    };

    return doSearch();
};

module.exports = {
    findAll: _.partialRight(searchMatrix, true),
    findOne: _.partialRight(searchMatrix, false)
};
