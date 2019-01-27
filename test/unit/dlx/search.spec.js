var search = require('../../../index');

describe('search', function () {
    describe('when searching for all solutions with mandatory constraints', function () {
        it('returns them all', function () {
            var constraints = [
                {
                    data: 0,
                    row: [1,0,0]
                },
                {
                    data: 1,
                    row: [0,1,0]
                },
                {
                    data: 2,
                    row: [0,0,1]
                },
                {
                    data: 3,
                    row: [1,0,1]
                }
            ];

            var solutions = search.findAll(constraints);

            var data = solutions.map(function (solution) {
                return solution.map((s) => s.data);
            });

            data[0].sort().should.eql([0,1,2]);
            data[1].sort().should.eql([1,3]);
        });
    });

    describe('when searching for all solutions with optional constraints', function () {
        it('returns them all', function () {
            var constraints = [
                {
                    data: 0,
                    primaryRow: [1,0,0],
                    secondaryRow: [0]
                },
                {
                    data: 1,
                    primaryRow: [0,1,0],
                    secondaryRow: [1]
                },
                {
                    data: 2,
                    primaryRow: [0,0,1],
                    secondaryRow: [0]
                },
                {
                    data: 3,
                    primaryRow: [1,0,1],
                    secondaryRow: [1]
                }
            ];

            var solutions = search.findAll(constraints);

            var data = solutions.map(function (solution) {
                return solution.map((s) => s.data);
            });

            data.length.should.eql(1);
            data[0].sort().should.eql([0,1,2]);
        });
    });
});
