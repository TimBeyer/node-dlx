var _ = require('lodash');
var createMatrix = require('../../../src/lib/matrix');
var search = require('../../../src/lib/search');


xdescribe('matrix', function () {

    it('exists', function () {
        should.exist(createMatrix);
    });

    describe('when passing constraints to the matrix', function () {
        var constraints;
        var matrix;

        beforeEach(function () {
            constraints = [
                {
                    data: '1',
                    row: [0, 0, 1]
                },
                {
                    data: '2',
                    row: [1, 1, 0]
                },
                {
                    data: '3',
                    row: [1, 0, 0]
                },
                {
                    data: '4',
                    row: [0, 1, 0]
                },
                {
                    data: '5',
                    row: [0, 1, 1]
                }
            ];

            var randomConstraints = _.times(100, function (i) {
                return {
                    data: i,
                    row: _.times(10, function () {
                        return Math.random() > 0.5 ? 1 : 0
                    })
                };
            })

            matrix = createMatrix(randomConstraints);
            var start = Date.now();
            console.log(search(matrix));
            var end = Date.now();
            console.log(end - start);
        });

        it('creates the root', function () {
            should.exist(matrix.root);
        });
    });

});
