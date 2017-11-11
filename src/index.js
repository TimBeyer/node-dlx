var matrix = require('./lib/matrix');
var search = require('./lib/search');

var findAll = function (constraints) {
    return search.findAll(matrix(constraints));
};

var findOne = function (constraints) {
    return search.findOne(matrix(constraints));
};

module.exports = {
    findOne: findOne,
    findAll: findAll
};
